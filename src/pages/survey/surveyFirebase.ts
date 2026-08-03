import {initializeApp} from "firebase/app";
import {
  connectFirestoreEmulator,
  doc,
  getDoc,
  getFirestore,
  type Firestore,
} from "firebase/firestore";
import type {SurveyDefinition} from "./surveyTypes";

const CAMPAIGN_ID = "first_generation_survey_v1";
let database: Firestore | null = null;

function requiredEnvironmentValue(name: string, value: string | undefined) {
  if (!value?.trim()) throw new Error(`Missing ${name}.`);
  return value.trim();
}

function surveyDatabase() {
  if (database) return database;
  const app = initializeApp({
    apiKey: requiredEnvironmentValue("VITE_FIREBASE_API_KEY", import.meta.env.VITE_FIREBASE_API_KEY),
    authDomain: requiredEnvironmentValue("VITE_FIREBASE_AUTH_DOMAIN", import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
    projectId: requiredEnvironmentValue("VITE_FIREBASE_PROJECT_ID", import.meta.env.VITE_FIREBASE_PROJECT_ID),
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: requiredEnvironmentValue("VITE_FIREBASE_APP_ID", import.meta.env.VITE_FIREBASE_APP_ID),
  }, "survey-page");
  database = getFirestore(app);
  if (import.meta.env.VITE_USE_FIREBASE_EMULATORS === "true") {
    connectFirestoreEmulator(
      database,
      import.meta.env.VITE_FIREBASE_EMULATOR_HOST || "127.0.0.1",
      Number(import.meta.env.VITE_FIRESTORE_EMULATOR_PORT || 8080),
    );
  }
  return database;
}

function isSurveyDefinition(value: unknown): value is SurveyDefinition {
  if (!value || typeof value !== "object") return false;
  const root = value as Record<string, unknown>;
  return root.campaignId === CAMPAIGN_ID &&
    Number.isInteger(root.version) &&
    root.status === "published" &&
    typeof root.title === "string" &&
    Array.isArray(root.questions) &&
    root.questions.length > 0;
}

export async function loadActiveSurvey(): Promise<SurveyDefinition> {
  const db = surveyDatabase();
  const campaignSnapshot = await getDoc(doc(db, "surveyCampaigns", CAMPAIGN_ID));
  const campaign = campaignSnapshot.data();
  const activeVersion = Number(campaign?.activeVersion);
  if (!campaignSnapshot.exists() || campaign?.status !== "published" ||
      !Number.isInteger(activeVersion) || activeVersion < 1) {
    throw new Error("No published survey is available.");
  }
  const versionSnapshot = await getDoc(doc(
    db,
    "surveyCampaigns",
    CAMPAIGN_ID,
    "versions",
    String(activeVersion),
  ));
  const definition = versionSnapshot.data();
  if (!versionSnapshot.exists() || !isSurveyDefinition(definition) ||
      definition.version !== activeVersion) {
    throw new Error("The published survey is invalid.");
  }
  return definition;
}
