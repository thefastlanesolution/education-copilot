import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';

// Jobify Components
import { Landing, Error, ProtectedRoute } from './pages';
import {
  Workshop,
  SharedLayout,
  DashboardHome,
  AddStudent,
} from './pages/dashboard';

// AI Tool Components
import ParentEmails from './pages/dashboard/AI-tools/ParentEmails.js';
import LessonPlan from './pages/dashboard/AI-tools/LessonPlans.js';
import RealLifeBenefits from './pages/dashboard/AI-tools/RealLifeBenefits.js';
import WritingPrompt from './pages/dashboard/AI-tools/WritingPrompt.js';
import WeeklyNewsletter from './pages/dashboard/AI-tools/WeeklyNewsletter.js';
import ResearchProjectGenerator from './pages/dashboard/AI-tools/ResearchProjectGenerator.js';
import IdeaGenerator from './pages/dashboard/AI-tools/ShotgunIdeas.js';
import InformationalHandout from './pages/dashboard/AI-tools/InformationalHandout.js';
import PricingPage from './pages/pricing/PricingPage.js';
import Explore from './pages/Explore';
import React from 'react';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SharedLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="all-students" element={<Workshop />} />
            {/* <Route path="pricing" element={<Pricing />} /> */}
            <Route path="/profile" element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="parent-emails" element={<ParentEmails />} />
            <Route path="lesson-planner" element={<LessonPlan />} />
            <Route path="real-life-benefits" element={<RealLifeBenefits />} />
            <Route path="weekly-newsletter" element={<WeeklyNewsletter />} />
            <Route
              path="informational-handout"
              element={<InformationalHandout />}
            />
            <Route
              path="research-project-generator"
              element={<ResearchProjectGenerator />}
            />
            <Route path="shotgun-idea-generator" element={<IdeaGenerator />} />
            <Route path="writing-prompts" element={<WritingPrompt />} />
          </Route>

          <Route path="add-student" element={<AddStudent />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
