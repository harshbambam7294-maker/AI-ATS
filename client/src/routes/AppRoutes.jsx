import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

import RecruiterDashboard from "../pages/Recruiter/Dashboard";
import CandidateDashboard from "../pages/Candidate/Dashboard/Dashboard";
import Companies from "../pages/Recruiter/Companies";
import CreateCompany from "../pages/Recruiter/CreateCompany";
import EditCompany from "../pages/Recruiter/EditCompany";
import MatchReport from "../pages/Recruiter/Match/MatchReport";
import InterviewReport from "../pages/Recruiter/Interview/InterviewReport";

import Apply from "../pages/Candidate/Apply/Apply";

const AppRoutes = () => {

    return (

        <Routes>

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

            <Route

                element={

                    <ProtectedRoute>

                        <DashboardLayout />

                    </ProtectedRoute>

                }

            >

                <Route
                path="/recruiter/company"
                element={
                    <ProtectedRoute role="recruiter">
                        <Companies />
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

                    path="/recruiter/dashboard"

                    element={

                        <ProtectedRoute role="recruiter">

                            <RecruiterDashboard />

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
                    path="/recruiter/interview/:candidateId/:jobId"
                    element={
                        <ProtectedRoute role="recruiter">
                         <InterviewReport />
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

                    path="/candidate/dashboard"

                    element={

                        <ProtectedRoute role="candidate">

                            <CandidateDashboard />

                        </ProtectedRoute>

                    }

                />

            </Route>

        </Routes>

    );

};

export default AppRoutes;