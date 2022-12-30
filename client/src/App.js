import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/auth/Profile';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';

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
import FreeStyle from './pages/dashboard/AI-tools/FreeStyle.js';
import LessonPlan from './pages/dashboard/AI-tools/LessonPlans.js';
import LessonPlannerV2 from './pages/dashboard/AI-tools/LessonPlannerV2';
import RealLifeBenefits from './pages/dashboard/AI-tools/RealLifeBenefits.js';
import WritingPrompt from './pages/dashboard/AI-tools/WritingPrompt.js';
import WeeklyNewsletter from './pages/dashboard/AI-tools/WeeklyNewsletter.js';
import ResearchProjectGenerator from './pages/dashboard/AI-tools/ResearchProjectGenerator.js';
import IdeaGenerator from './pages/dashboard/AI-tools/IdeaGenerator.js';
import InformationalHandout from './pages/dashboard/AI-tools/InformationalHandout.js';
import PricingPage from './pages/pricing/PricingPage.js';
import CompletionHistory from './pages/dashboard/AI-tools/CompletionHistory.js';
import StudentReports from './pages/dashboard/AI-tools/StudentReports.js';
import React from 'react';
import ComprehensiveVocab from './pages/dashboard/AI-tools/ComprehensiveVocabulary';
import EnglishSpanish from './pages/dashboard/AI-tools/EnglishSpanish';
import GoogleSlide from './pages/dashboard/AI-tools/PowerPointGenerator';
import Sample from './pages/dashboard/AI-tools/Sample';
import Creations from './pages/dashboard/dashboard-pages/creationPages/Creations';
import LessonPlanHistory from './pages/dashboard/dashboard-pages/creationPages/LessonPlanHistory';
import PowerpointHistory from './pages/dashboard/dashboard-pages/creationPages/PowerpointHistory';
import ContextBuilderHistory from './pages/dashboard/dashboard-pages/creationPages/ContextBuilderHistory';
import RecipeHistory from './pages/dashboard/dashboard-pages/creationPages/RecipeHistory';
import ContextBuilder from './pages/dashboard/AI-tools/ContextBuilder';
import RecipeBuilder from './pages/dashboard/AI-tools/Recipe-Builder/RecipeBuilder';
import EducationalHandout from './pages/dashboard/AI-tools/EducationalHandout';
import EducationalHandoutHistory from './pages/dashboard/dashboard-pages/creationPages/EducationalHandoutHistory.js';
import WritingPromptHistory from './pages/dashboard/dashboard-pages/creationPages/writingPromptHistory.js';
import UnitPlanner from './pages/dashboard/UnitPlanner/UnitPlanner.js';
import UnitPlanner1 from './pages/dashboard/UnitPlanner/UnitPlanner1.js';
import UnitHistory from './pages/dashboard/UnitPlanner/UnitHistory.js';
import UnitPreview from './pages/dashboard/UnitPlanner/UnitPreview.js';
import VideoList from './pages/dashboard/AI-tools/VideoList.js';

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
            {/* <Route path="pricing" element={<Pricing />} /> */}
            <Route path="/" element={<PrivateRoute />}>
              <Route path="unit-planner/:unitID" element={<UnitPreview />} />
              <Route path="/test" element={<VideoList />} />
              <Route path="/profile" element={<Profile />} />
              <Route index element={<DashboardHome />} />
              <Route path="workshop" element={<Workshop />} />
              <Route path="parent-emails" element={<ParentEmails />} />
              <Route path="freestyle" element={<FreeStyle />} />
              <Route path="lesson-planner" element={<LessonPlan />} />
              <Route
                path="comprehensive-vocab"
                element={<ComprehensiveVocab />}
              />
              <Route path="real-life-benefits" element={<RealLifeBenefits />} />
              <Route path="weekly-newsletter" element={<WeeklyNewsletter />} />
              <Route path="student-reports" element={<StudentReports />} />
              <Route
                path="informational-handout"
                element={<InformationalHandout />}
              />
              <Route
                path="research-project-generator"
                element={<ResearchProjectGenerator />}
              />
              <Route path="idea-generator" element={<IdeaGenerator />} />
              <Route path="writing-prompts" element={<WritingPrompt />} />
              <Route path="english-to-spanish" element={<EnglishSpanish />} />
              <Route path="add-student" element={<AddStudent />} />
              <Route path="history" element={<CompletionHistory />} />
              <Route path="powerpoints" element={<GoogleSlide />} />
              <Route
                path="educational-handout"
                element={<EducationalHandout />}
              />
              <Route path="lessonplannerv2" element={<LessonPlannerV2 />} />
              <Route path="creations" element={<Creations />} />
              <Route path="context-builder" element={<ContextBuilder />} />
              <Route path="unit-history" element={<UnitHistory />} />
              <Route path="unit-planner1" element={<UnitPlanner />} />
              <Route path="unit-planner" element={<UnitPlanner1 />} />
              <Route path="recipe-builder" element={<RecipeBuilder />} />
              <Route
                path="creations/educational-handouts"
                element={<EducationalHandoutHistory />}
              />
              <Route
                path="creations/lesson-plans"
                element={<LessonPlanHistory />}
              />
              <Route
                path="creations/writing-prompts"
                element={<WritingPromptHistory />}
              />
              <Route
                path="creations/powerpoints"
                element={<PowerpointHistory />}
              />
              <Route
                path="creations/context-builders"
                element={<ContextBuilderHistory />}
              />
              <Route path="creations/recipes" element={<RecipeHistory />} />
            </Route>
          </Route>

          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* <Route path="/pricing" element={<PricingPage />} /> */}
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
