import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

// Recruiter
import RecruiterDashboard from "../pages/Recruiter/Dashboard";
import Companies from "../pages/Recruiter/Companies";
import CreateCompany from "../pages/Recruiter/CreateCompany";
import EditCompany from "../pages/Recruiter/EditCompany";
import Jobs from "../pages/Recruiter/Jobs/Jobs";
import Applications from "../pages/Recruiter/Applications/Applications";
import MatchReport from "../pages/Recruiter/Match/MatchReport";
import InterviewReport from "../pages/Recruiter/Interview/InterviewReport";

// Candidate
import CandidateDashboard from "../pages/Candidate/Dashboard/Dashboard";
import CandidateJobs from "../pages/Candidate/Jobs/Jobs";
import JobDetails from "../pages/Candidate/Jobs/JobDetails";
import Apply from "../pages/Candidate/Apply/Apply";
import MyApplications from "../pages/Candidate/Applications/MyApplications";
import Profile from "../pages/Candidate/Profile/Profile";
import ResumeReview from "../pages/Candidate/ResumeReview/ResumeReview";

const AppRoutes = () => {

    return (

        <Routes>

            {/* Public Routes */}

            <Route element={<MainLayout />}>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

            </Route>

            {/* Protected Routes */}

            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >

                {/* ===================== Recruiter ===================== */}

                <Route
                    path="/recruiter/dashboard"
                    element={
                        <ProtectedRoute role="recruiter">
                            <RecruiterDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/recruiter/companies"
                    element={
                        <ProtectedRoute role="recruiter">
                            <Companies />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/recruiter/companies/create"
                    element={
                        <ProtectedRoute role="recruiter">
                            <CreateCompany />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/recruiter/companies/edit/:id"
                    element={
                        <ProtectedRoute role="recruiter">
                            <EditCompany />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/recruiter/jobs"
                    element={
                        <ProtectedRoute role="recruiter">
                            <Jobs />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/recruiter/applications"
                    element={
                        <ProtectedRoute role="recruiter">
                            <Applications />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/recruiter/match/:candidateId/:jobId"
                    element={
                        <ProtectedRoute role="recruiter">
                            <MatchReport />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/recruiter/interview/:candidateId/:jobId"
                    element={
                        <ProtectedRoute role="recruiter">
                            <InterviewReport />
                        </ProtectedRoute>
                    }
                />

                {/* ===================== Candidate ===================== */}

                <Route
                    path="/candidate/dashboard"
                    element={
                        <ProtectedRoute role="candidate">
                            <CandidateDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/candidate/jobs"
                    element={
                        <ProtectedRoute role="candidate">
                            <CandidateJobs />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/candidate/jobs/:id"
                    element={
                        <ProtectedRoute role="candidate">
                            <JobDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/candidate/apply/:jobId"
                    element={
                        <ProtectedRoute role="candidate">
                            <Apply />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/candidate/applications"
                    element={
                        <ProtectedRoute role="candidate">
                            <MyApplications />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/candidate/profile"
                    element={
                        <ProtectedRoute role="candidate">
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/candidate/resume-review"
                    element={
                        <ProtectedRoute role="candidate">
                            <ResumeReview />
                        </ProtectedRoute>
                    }
                />

            </Route>

            {/* Fallback */}

            <Route
                path="*"
                element={<Home />}
            />

        </Routes>

    );

};

export default AppRoutes;