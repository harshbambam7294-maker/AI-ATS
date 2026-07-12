import { useEffect, useState } from "react";
import api from "../../../services/api";

import ApplicationTable from "./ApplicationTable";
import ApplicationStats from "./ApplicationStats";
import ApplicationFilters from "./ApplicationFilters";
import StatusModal from "./StatusModal";
import InterviewModal from "./InterviewModal";

const Applications = () => {

    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [selectedApplication, setSelectedApplication] = useState(null);

    const [showStatus, setShowStatus] = useState(false);

    const [showInterview, setShowInterview] = useState(false);

    useEffect(() => {

        fetchApplications();

    }, []);

    const fetchApplications = async () => {

        try {

            const res = await api.get("/applications");

            setApplications(res.data.applications);

        } catch (err) {

            console.log(err);

        }

        setLoading(false);

    };

    const filteredApplications = applications.filter(app =>

        app.candidate.name
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        app.job.title
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    if (loading) {

        return (

            <div className="flex justify-center items-center h-[70vh]">

                Loading Applications...

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-4xl font-bold">

                        Applications

                    </h1>

                    <p className="text-slate-500 mt-2">

                        AI Recruitment Dashboard

                    </p>

                </div>

            </div>

            <ApplicationStats
                applications={applications}
            />

            <ApplicationFilters
                search={search}
                setSearch={setSearch}
            />

            <ApplicationTable
                applications={filteredApplications}
                onStatus={(app) => {

                    setSelectedApplication(app);

                    setShowStatus(true);

                }}
                onInterview={(app) => {

                    setSelectedApplication(app);

                    setShowInterview(true);

                }}
            />

            {

                showStatus &&

                <StatusModal

                    application={selectedApplication}

                    onClose={() => {

                        setShowStatus(false);

                        fetchApplications();

                    }}

                />

            }

            {

                showInterview &&

                <InterviewModal

                    application={selectedApplication}

                    onClose={() => {

                        setShowInterview(false);

                    }}

                />

            }

        </div>

    );

};

export default Applications;