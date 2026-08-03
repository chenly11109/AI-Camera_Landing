export type SurveyQuestionType =
  | "singleChoice"
  | "multipleChoice"
  | "shortText"
  | "longText"
  | "rating";

export interface SurveyOption {
  id: string;
  label: string;
  allowsText?: boolean;
  textRequired?: boolean;
  textMaxLength?: number;
  exclusive?: boolean;
}

export interface SurveyQuestion {
  id: string;
  type: SurveyQuestionType;
  title: string;
  subtitle?: string;
  required?: boolean;
  options?: SurveyOption[];
  minSelections?: number;
  maxSelections?: number;
  minLength?: number;
  maxLength?: number;
  ratingMin?: number;
  ratingMax?: number;
  ratingStep?: number;
  ratingMinLabel?: string;
  ratingMaxLabel?: string;
}

export interface SurveyDefinition {
  campaignId: string;
  version: number;
  status: "published";
  title: string;
  description?: string;
  questions: SurveyQuestion[];
}

export type SurveyAnswer = string | string[] | number | null;
export type SurveyAnswers = Record<string, SurveyAnswer>;
export type SurveyOtherText = Record<string, string | null>;

export interface SurveySubmitMessage {
  type: "submit";
  campaignId: string;
  surveyVersion: number;
  answers: SurveyAnswers;
  otherText: SurveyOtherText;
}

declare global {
  interface Window {
    webkit?: {
      messageHandlers?: {
        kiraSurvey?: {postMessage: (message: unknown) => void};
      };
    };
  }
}
