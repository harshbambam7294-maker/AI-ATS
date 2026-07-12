import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (

        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">

            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-16">

                <Link
                    to="/"
                    className="text-2xl font-bold text-blue-600"
                >
                    HireIQ
                </Link>

                <div className="flex items-center gap-6">

                    <Link to="/">Home</Link>

                    <Link to="/jobs">
                        Jobs
                    </Link>

                    {!user && (

                        <>
                            <Link to="/login">
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                            >
                                Register
                            </Link>
                        </>

                    )}

                    {user && (

                        <>
                            <Link
                                to={
                                    user.role === "recruiter"
                                        ? "/recruiter/dashboard"
                                        : "/candidate/dashboard"
                                }
                            >
                                Dashboard
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="text-red-500"
                            >
                                Logout
                            </button>

                        </>

                    )}

                </div>

            </div>

        </nav>

    );

};

export default Navbar;