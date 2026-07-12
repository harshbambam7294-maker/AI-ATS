import { useEffect, useState } from "react";
import api from "../../../services/api";

import ApplicationCard from "./ApplicationCard";

const MyApplications = () => {

    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchApplications();

    }, []);

    const fetchApplications = async () => {

        try {

            const res = await api.get("/applications/my");

            setApplications(res.data.applications);

        }

        catch (err) {

            console.log(err);

        }

        setLoading(false);

    };

    const withdrawApplication = async (id) => {

        const confirmDelete = window.confirm(
            "Withdraw this application?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/applications/${id}`);

            setApplications(prev =>
                prev.filter(app => app._id !== id)
            );

        }

        catch (err) {

            console.log(err);

        }

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-[70vh]">

                Loading Applications...

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold">

                    My Applications

                </h1>

                <p className="text-slate-500 mt-2">

                    Track all your job applications.

                </p>

            </div>

            {

                applications.length === 0 ?

                (

                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center">

                        <h2 className="text-2xl font-semibold">

                            No Applications Yet

                        </h2>

                        <p className="text-slate-500 mt-3">

                            Start applying for jobs.

                        </p>

                    </div>

                )

                :

                (

                    <div className="grid lg:grid-cols-2 gap-6">

                        {

                            applications.map(app => (

                                <ApplicationCard

                                    key={app._id}

                                    application={app}

                                    onWithdraw={withdrawApplication}

                                />

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

};

export default MyApplications;