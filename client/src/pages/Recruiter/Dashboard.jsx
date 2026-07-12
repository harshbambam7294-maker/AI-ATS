import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const Dashboard = () => {

    const [stats, setStats] = useState({});

    const [recentJobs, setRecentJobs] = useState([]);

    const [recentApplications, setRecentApplications] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const res = await api.get("/dashboard/recruiter");

            setStats(res.data.stats);

            setRecentJobs(res.data.recentJobs);

            setRecentApplications(res.data.recentApplications);

        } catch (error) {

            console.log(error);

        }

        setLoading(false);

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-[80vh] text-xl">

                Loading Dashboard...

            </div>

        );

    }

    const cards = [

        {
            title: "Companies",
            value: stats.companies,
            color: "bg-blue-500"
        },

        {
            title: "Jobs",
            value: stats.jobs,
            color: "bg-emerald-500"
        },

        {
            title: "Applications",
            value: stats.applications,
            color: "bg-purple-500"
        },

        {
            title: "Pending",
            value: stats.pending,
            color: "bg-yellow-500"
        },

        {
            title: "Accepted",
            value: stats.accepted,
            color: "bg-green-500"
        },

        {
            title: "Rejected",
            value: stats.rejected,
            color: "bg-red-500"
        }

    ];

    return (

        <div className="space-y-10">

            {/* Header */}

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-4xl font-bold">

                        Recruiter Dashboard

                    </h1>

                    <p className="text-slate-500 mt-2">

                        Welcome back 👋

                    </p>

                </div>

                <div className="flex gap-4">

                    <Link
                        to="/recruiter/company"
                        className="bg-blue-600 text-white px-5 py-3 rounded-xl"
                    >
                        + Company
                    </Link>

                    <Link
                        to="/recruiter/jobs/create"
                        className="bg-emerald-600 text-white px-5 py-3 rounded-xl"
                    >
                        + Job
                    </Link>

                </div>

            </div>

            {/* Cards */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {

                    cards.map(card => (

                        <div

                            key={card.title}

                            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6"

                        >

                            <div

                                className={`w-14 h-14 rounded-xl ${card.color}`}

                            />

                            <h2 className="text-xl font-semibold mt-5">

                                {card.title}

                            </h2>

                            <p className="text-5xl font-bold mt-3">

                                {card.value}

                            </p>

                        </div>

                    ))

                }

            </div>

            {/* Recent Jobs */}

            <div className="bg-white rounded-2xl shadow-sm p-6">

                <h2 className="text-2xl font-bold mb-6">

                    Recent Jobs

                </h2>

                {

                    recentJobs.length === 0 ?

                        <p>No jobs yet.</p>

                        :

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead>

                                    <tr className="border-b">

                                        <th className="text-left py-3">

                                            Job

                                        </th>

                                        <th className="text-left">

                                            Company

                                        </th>

                                        <th className="text-left">

                                            Location

                                        </th>

                                        <th className="text-left">

                                            Type

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        recentJobs.map(job => (

                                            <tr

                                                key={job._id}

                                                className="border-b hover:bg-slate-50"

                                            >

                                                <td className="py-4">

                                                    {job.title}

                                                </td>

                                                <td>

                                                    {job.company.name}

                                                </td>

                                                <td>

                                                    {job.location}

                                                </td>

                                                <td>

                                                    {job.employmentType}

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </table>

                        </div>

                }

            </div>

            {/* Recent Applications */}

            <div className="bg-white rounded-2xl shadow-sm p-6">

                <h2 className="text-2xl font-bold mb-6">

                    Recent Applications

                </h2>

                {

                    recentApplications.length === 0 ?

                        <p>No applications yet.</p>

                        :

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead>

                                    <tr className="border-b">

                                        <th className="text-left py-3">

                                            Candidate

                                        </th>

                                        <th className="text-left">

                                            Job

                                        </th>

                                        <th className="text-left">

                                            Status

                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        recentApplications.map(app => (

                                            <tr

                                                key={app._id}

                                                className="border-b hover:bg-slate-50"

                                            >

                                                <td className="py-4">

                                                    {app.candidate.name}

                                                </td>

                                                <td>

                                                    {app.job.title}

                                                </td>

                                                <td>

                                                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">

                                                        {app.status}

                                                    </span>

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </table>

                        </div>

                }

            </div>

        </div>

    );

};

export default Dashboard;