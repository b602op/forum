import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import { ProfilesPage } from "./pages/ProfilesPage";
import { CreateProfilesPage } from "./pages/CreateProfilesPage";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Navigate to="/profile/1" replace />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/profile" element={<ProfilesPage />} />
        <Route path="/profile/create" element={<CreateProfilesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;