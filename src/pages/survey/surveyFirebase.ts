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
const STAGING_FIREBASE_CONFIG = {
  apiKey: "AIzaSyAfat9kaSge6FwTuC1bwa4U4RAC5jGUXXM",
  authDomain: "ai-camera-app-9318b.firebaseapp.com",
  projectId: "ai-camera-app-9318b",
  storageBucket: "ai-camera-app-9318b.firebasestorage.app",
  messagingSenderId: "35975432714",
  appId: "1:35975432714:web:65ba0a10670bcd99756df3",
};
let database: Firestore | null = null;

function configuredValue(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function surveyDatabase() {
  if (database) return database;
  const app = initializeApp({
    apiKey: configuredValue(import.meta.env.VITE_FIREBASE_API_KEY, STAGING_FIREBASE_CONFIG.apiKey),
    authDomain: configuredValue(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, STAGING_FIREBASE_CONFIG.authDomain),
    projectId: configuredValue(import.meta.env.VITE_FIREBASE_PROJECT_ID, STAGING_FIREBASE_CONFIG.projectId),
    storageBucket: configuredValue(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, STAGING_FIREBASE_CONFIG.storageBucket),
    messagingSenderId: configuredValue(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, STAGING_FIREBASE_CONFIG.messagingSenderId),
    appId: configuredValue(import.meta.env.VITE_FIREBASE_APP_ID, STAGING_FIREBASE_CONFIG.appId),
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
