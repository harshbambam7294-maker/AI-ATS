import { useEffect, useState } from "react";
import api from "../../../services/api";

import StatsCards from "./StatsCards";
import RecentApplications from "./RecentApplications";
import ProfileCard from "./ProfileCard";

const Dashboard = () => {

    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({});

    const [applications, setApplications] = useState([]);

    const [profile, setProfile] = useState(null);

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const res = await api.get("/dashboard/candidate");

            setStats(res.data.stats);

            setApplications(res.data.recentApplications);

            setProfile(res.data.profile);

        }

        catch (err) {

            console.log(err);

        }

        setLoading(false);

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-[70vh]">

                Loading Dashboard...

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold">

                    Welcome Back, {profile?.name} 👋

                </h1>

                <p className="text-slate-500 mt-2">

                    Track your applications and explore new opportunities.

                </p>

            </div>

            <StatsCards

                stats={stats}

            />

            <div className="grid lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2">

                    <RecentApplications

                        applications={applications}

                    />

                </div>

                <ProfileCard

                    profile={profile}

                />

            </div>

        </div>

    );

};

export default Dashboard;