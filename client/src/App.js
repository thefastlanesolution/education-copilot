import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register, Landing, Error, ProtectedRoute } from './pages';
import {
  Workshop,
  Profile,
  SharedLayout,
  Stats,
  AddStudent,
} from './pages/dashboard';

import ParentEmails from './pages/dashboard/AI-tools/ParentEmails.js';
import LessonPlan from './pages/dashboard/AI-tools/LessonPlans.js';
import RealLifeBenefits from './pages/dashboard/AI-tools/RealLifeBenefits.js';
import WritingPrompt from './pages/dashboard/AI-tools/WritingPrompt.js';
import WeeklyNewsletter from './pages/dashboard/AI-tools/WeeklyNewsletter.js';
import ResearchProjectGenerator from './pages/dashboard/AI-tools/ResearchProjectGenerator.js';
import IdeaGenerator from './pages/dashboard/AI-tools/ShotgunIdeas.js';
import InformationalHandout from './pages/dashboard/AI-tools/InformationalHandout.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="all-students" element={<Workshop />} />
          <Route path="add-student" element={<AddStudent />} />
          <Route path="profile" element={<Profile />} />
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
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
