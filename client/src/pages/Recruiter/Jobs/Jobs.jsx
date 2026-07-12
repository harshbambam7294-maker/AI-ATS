import { useEffect, useState } from "react";
import api from "../../../services/api";
import JobTable from "./JobTable";
import JobCard from "./JobCard";
import JobModal from "./JobModal";
import DeleteJobDialog from "./DeleteJobDialog";
import JobStats from "./JobStats";
import JobFilters from "./JobFilters";

const Jobs = () => {

    const [jobs, setJobs] = useState([]);

    const [loading, setLoading] = useState(true);

    const [selectedJob, setSelectedJob] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [showDelete, setShowDelete] = useState(false);

    const [search, setSearch] = useState("");

    useEffect(() => {

        fetchJobs();

    }, []);

    const fetchJobs = async () => {

        try {

            const res = await api.get("/jobs");

            setJobs(res.data.jobs);

        } catch (err) {

            console.log(err);

        }

        setLoading(false);

    };

    const createJob = () => {

        setSelectedJob(null);

        setShowModal(true);

    };

    const editJob = (job) => {

        setSelectedJob(job);

        setShowModal(true);

    };

    const deleteJob = (job) => {

        setSelectedJob(job);

        setShowDelete(true);

    };

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company?.name.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="space-y-8">

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-4xl font-bold">

                        Jobs

                    </h1>

                    <p className="text-slate-500">

                        Manage all job postings

                    </p>

                </div>

                <button

                    onClick={createJob}

                    className="bg-blue-600 text-white px-5 py-3 rounded-xl"

                >

                    + Create Job

                </button>

            </div>

            {

                loading ?

                    <div>Loading...</div>

                    :

                    <>
                    <JobStats jobs={jobs} />

                    <JobFilters
                        search={search}
                        setSearch={setSearch}
                    />

                    <JobTable
                        jobs={filteredJobs}
                        onEdit={editJob}
                        onDelete={deleteJob}
                    />
                </>

            }

            {

                showModal &&

                <JobModal

                    job={selectedJob}

                    onClose={() => {

                        setShowModal(false);

                        fetchJobs();

                    }}

                />

            }

            {

                showDelete &&

                <DeleteJobDialog

                    job={selectedJob}

                    onClose={() => {

                        setShowDelete(false);

                        fetchJobs();

                    }}

                />

            }

        </div>

    );

};

export default Jobs;