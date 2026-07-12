import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {

    const { user } = useAuth();

    const recruiterLinks = [

        {
            name: "Dashboard",
            path: "/recruiter/dashboard",
        },

        {
            name: "Companies",
            path: "/recruiter/companies",
        },

        {
            name: "Jobs",
            path: "/recruiter/jobs",
        },

        {
            name: "Applications",
            path: "/recruiter/applications",
        },

        {
            name: "AI Matching",
            path: "/recruiter/matching",
        },

        {
            name: "Interview Questions",
            path: "/recruiter/interview",
        },

    ];

    const candidateLinks = [

        {
            name: "Dashboard",
            path: "/candidate/dashboard",
        },

        {
            name: "Jobs",
            path: "/candidate/jobs",
        },

        {
            name: "Applications",
            path: "/candidate/applications",
        },

        {
            name: "Resume",
            path: "/candidate/resume",
        },

        {
            name: "Resume Review",
            path: "/candidate/review",
        },

    ];

    const links =
        user?.role === "recruiter"
            ? recruiterLinks
            : candidateLinks;

    return (

        <aside className="w-64 bg-white border-r border-slate-200 min-h-screen pt-20">

            <div className="flex flex-col">

                {

                    links.map(link => (

                        <NavLink

                            key={link.path}

                            to={link.path}

                            className={({ isActive }) =>

                                `px-6 py-4 hover:bg-blue-50

                                ${isActive

                                    ? "bg-blue-100 text-blue-600 font-semibold"

                                    : ""

                                }`

                            }

                        >

                            {link.name}

                        </NavLink>

                    ))

                }

            </div>

        </aside>

    );

};

export default Sidebar;