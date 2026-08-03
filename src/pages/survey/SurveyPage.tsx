import {useEffect, useMemo, useState} from "react";
import {loadActiveSurvey} from "./surveyFirebase";
import type {
  SurveyAnswer,
  SurveyAnswers,
  SurveyDefinition,
  SurveyOtherText,
  SurveyQuestion,
  SurveySubmitMessage,
} from "./surveyTypes";
import "./survey.css";

type NativeEvent =
  | {type: "submissionSucceeded"; rewardGranted?: boolean; rewardCredits?: number}
  | {type: "submissionFailed"; message?: string};

function initialAnswer(question: SurveyQuestion): SurveyAnswer {
  if (question.type === "multipleChoice") return [];
  return null;
}

function selectedValues(value: SurveyAnswer): string[] {
  if (Array.isArray(value)) return value;
  return typeof value === "string" && value ? [value] : [];
}

function otherOption(question: SurveyQuestion, answer: SurveyAnswer) {
  const selected = new Set(selectedValues(answer));
  return question.options?.find((option) => selected.has(option.id) && option.allowsText);
}

function answerIsValid(
  question: SurveyQuestion,
  answer: SurveyAnswer,
  otherText: string | null | undefined,
) {
  if (question.type === "singleChoice" || question.type === "multipleChoice") {
    const values = selectedValues(answer);
    const minimum = question.minSelections ?? (question.required === false ? 0 : 1);
    const maximum = question.maxSelections ??
      (question.type === "multipleChoice" ? question.options?.length ?? 1 : 1);
    if (values.length < minimum || values.length > maximum) return false;
    const option = otherOption(question, answer);
    if (option && (otherText?.length ?? 0) > (option.textMaxLength ?? 300)) return false;
    return !option?.textRequired || Boolean(otherText?.trim());
  }
  if (question.type === "shortText" || question.type === "longText") {
    const text = typeof answer === "string" ? answer.trim() : "";
    if (!text && question.required === false) return true;
    return text.length >= (question.minLength ?? 1) &&
      text.length <= (question.maxLength ?? (question.type === "shortText" ? 300 : 2_000));
  }
  if (answer == null && question.required === false) return true;
  return typeof answer === "number" &&
    answer >= (question.ratingMin ?? 1) && answer <= (question.ratingMax ?? 5);
}

export function SurveyPage() {
  const [definition, setDefinition] = useState<SurveyDefinition | null>(null);
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [otherText, setOtherText] = useState<SurveyOtherText>({});
  const [step, setStep] = useState(0);
  const [loadingError, setLoadingError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState<NativeEvent | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadActiveSurvey().then((survey) => {
      if (cancelled) return;
      setDefinition(survey);
      setAnswers(Object.fromEntries(survey.questions.map((question) => [
        question.id,
        initialAnswer(question),
      ])));
    }).catch(() => {
      if (!cancelled) setLoadingError("The survey could not be loaded. Please try again.");
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const listener = (event: Event) => {
      const detail = (event as CustomEvent<NativeEvent>).detail;
      if (!detail || (detail.type !== "submissionSucceeded" &&
          detail.type !== "submissionFailed")) return;
      setSubmitting(false);
      if (detail.type === "submissionSucceeded") {
        setCompleted(detail);
        setSubmitError("");
      } else {
        setSubmitError(detail.message || "Your survey was not submitted. Please try again.");
      }
    };
    window.addEventListener("kiraSurveyNative", listener);
    return () => window.removeEventListener("kiraSurveyNative", listener);
  }, []);

  const question = definition?.questions[step];
  const answer = question ? answers[question.id] : null;
  const valid = question ? answerIsValid(question, answer, otherText[question.id]) : false;
  const progress = definition ? ((step + 1) / definition.questions.length) * 100 : 0;
  const bridgeAvailable = Boolean(window.webkit?.messageHandlers?.kiraSurvey);

  const ratingValues = useMemo(() => {
    if (!question || question.type !== "rating") return [];
    const values: number[] = [];
    const minimum = question.ratingMin ?? 1;
    const maximum = question.ratingMax ?? 5;
    const increment = question.ratingStep ?? 1;
    for (let value = minimum; value <= maximum; value += increment) values.push(value);
    return values;
  }, [question]);

  function choose(optionId: string) {
    if (!question) return;
    if (question.type === "singleChoice") {
      const next = question.required === false && answer === optionId ? null : optionId;
      setAnswers((current) => ({...current, [question.id]: next}));
      return;
    }
    const current = selectedValues(answer);
    const option = question.options?.find((candidate) => candidate.id === optionId);
    let next: string[];
    if (option?.exclusive) {
      next = current.length === 1 && current[0] === optionId ? [] : [optionId];
    } else if (current.includes(optionId)) {
      next = current.filter((value) => value !== optionId);
    } else {
      const withoutExclusive = current.filter((value) =>
        !question.options?.find((candidate) => candidate.id === value)?.exclusive);
      const maximum = question.maxSelections ?? question.options?.length ?? 1;
      next = withoutExclusive.length < maximum ? [...withoutExclusive, optionId] : withoutExclusive;
    }
    setAnswers((values) => ({...values, [question.id]: next}));
  }

  function submit() {
    if (!definition || !question || !valid || submitting) return;
    const handler = window.webkit?.messageHandlers?.kiraSurvey;
    if (!handler) {
      setSubmitError("Please open this survey inside the Kira Snap app to submit it.");
      return;
    }
    const message: SurveySubmitMessage = {
      type: "submit",
      campaignId: definition.campaignId,
      surveyVersion: definition.version,
      answers,
      otherText,
    };
    setSubmitError("");
    setSubmitting(true);
    handler.postMessage(message);
  }

  if (loadingError) {
    return <main className="survey-page"><section className="survey-state-card"><div className="survey-mark">!</div><h1>Survey unavailable</h1><p>{loadingError}</p><button onClick={() => window.location.reload()}>Try Again</button></section></main>;
  }
  if (!definition || !question) {
    return <main className="survey-page"><section className="survey-state-card"><div className="survey-spinner" /><h1>Loading your survey…</h1></section></main>;
  }
  if (completed?.type === "submissionSucceeded") {
    const credits = completed.rewardCredits ?? 50;
    return <main className="survey-page"><section className="survey-state-card survey-success"><div className="survey-mark">✓</div><h1>Thanks for sharing!</h1><p>{completed.rewardGranted === false ? "Your response was saved. You already received this survey reward." : `${credits} credits have been added to your account.`}</p><button onClick={() => window.webkit?.messageHandlers?.kiraSurvey?.postMessage({type: "close"})}>Done</button></section></main>;
  }

  const selected = new Set(selectedValues(answer));
  const textOption = otherOption(question, answer);
  const textValue = typeof answer === "string" ? answer : "";
  const maxLength = question.maxLength ?? (question.type === "shortText" ? 300 : 2_000);

  return <main className="survey-page">
    <section className="survey-shell">
      <header className="survey-header">
        <div><span className="survey-eyebrow">Kira Snap</span><h1>{definition.title}</h1></div>
        <span className="survey-step">{step + 1} / {definition.questions.length}</span>
      </header>
      <div className="survey-progress"><span style={{width: `${progress}%`}} /></div>
      <section className="survey-question">
        <h2>{question.title}</h2>
        {question.subtitle && <p>{question.subtitle}</p>}

        {(question.type === "singleChoice" || question.type === "multipleChoice") &&
          <div className="survey-options">{question.options?.map((option) =>
            <button type="button" className={selected.has(option.id) ? "selected" : ""} onClick={() => choose(option.id)} key={option.id}>
              <span className="survey-choice-indicator">{selected.has(option.id) ? "✓" : ""}</span><span>{option.label}</span>
            </button>)}</div>}

        {(question.type === "shortText" || question.type === "longText") &&
          <label className="survey-text-field">
            {question.type === "longText" ?
              <textarea value={textValue} maxLength={maxLength} onChange={(event) => setAnswers((current) => ({...current, [question.id]: event.target.value}))} /> :
              <input value={textValue} maxLength={maxLength} onChange={(event) => setAnswers((current) => ({...current, [question.id]: event.target.value}))} />}
            <span>{textValue.length} / {maxLength}</span>
          </label>}

        {question.type === "rating" && <div className="survey-rating-wrap">
          <div className="survey-rating">{ratingValues.map((value) => <button type="button" className={answer === value ? "selected" : ""} onClick={() => setAnswers((current) => ({...current, [question.id]: value}))} key={value}>{value}</button>)}</div>
          <div className="survey-rating-labels"><span>{question.ratingMinLabel}</span><span>{question.ratingMaxLabel}</span></div>
        </div>}

        {textOption && <label className="survey-text-field survey-other"><span>Tell us more</span><textarea value={otherText[question.id] ?? ""} maxLength={textOption.textMaxLength ?? 300} onChange={(event) => setOtherText((current) => ({...current, [question.id]: event.target.value}))} /></label>}
        {submitError && <div className="survey-error" role="alert">{submitError}</div>}
        {!bridgeAvailable && step === definition.questions.length - 1 && <p className="survey-browser-note">Submission is available inside the Kira Snap app.</p>}
      </section>
      <footer className="survey-actions">
        <button className="secondary" disabled={step === 0 || submitting} onClick={() => setStep((value) => Math.max(0, value - 1))}>Back</button>
        {step < definition.questions.length - 1 ?
          <button disabled={!valid} onClick={() => setStep((value) => value + 1)}>Next</button> :
          <button disabled={!valid || submitting} onClick={submit}>{submitting ? "Submitting…" : "Submit Survey"}</button>}
      </footer>
    </section>
  </main>;
}
