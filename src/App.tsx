import { Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { PrivacyPage } from "./pages/privacy/PrivacyPage";
import { SupportPage } from "./pages/support/SupportPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/privacy" element={<Navigate to="/privacy/en" replace />} />
      <Route path="/privacy/:language" element={<PrivacyPage />} />
      <Route path="/support" element={<Navigate to="/support/en" replace />} />
      <Route path="/support/:language" element={<SupportPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
