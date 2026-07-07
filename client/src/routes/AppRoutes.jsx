import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import CandidateDashboard from "../pages/Candidate/Dashboard";
import RecruiterDashboard from "../pages/Recruiter/Dashboard";
import AdminDashboard from "../pages/Admin/Dashboard";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
                <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;