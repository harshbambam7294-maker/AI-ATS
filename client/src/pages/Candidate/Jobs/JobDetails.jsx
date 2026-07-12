import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../services/api";

const formatSalary = (salary) => {

    if (!salary) return "Not Disclosed";

    if (salary >= 100000) {

        return `₹${(salary / 100000).toFixed(1)} LPA`;

    }

    return `₹${salary}`;

};

const JobDetails = () => {

    const { id } = useParams();

    const [job, setJob] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchJob();

    }, []);

    const fetchJob = async () => {

        try {

            const res = await api.get(`/jobs/public/${id}`);

            setJob(res.data.job);

        }

        catch (err) {

            console.log(err);

        }

        setLoading(false);

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-[70vh]">

                Loading Job...

            </div>

        );

    }

    if (!job) {

        return (

            <div className="text-center py-20">

                Job Not Found

            </div>

        );

    }

    return (

        <div className="max-w-6xl mx-auto space-y-8">

            {/* Header */}

            <div className="bg-white rounded-2xl shadow-sm p-8">

                <div className="flex justify-between items-start">

                    <div className="flex gap-5">

                        <div className="w-20 h-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">

                            {job.company.name.charAt(0)}

                        </div>

                        <div>

                            <h1 className="text-4xl font-bold">

                                {job.title}

                            </h1>

                            <p className="text-xl text-slate-500 mt-2">

                                {job.company.name}

                            </p>

                            <div className="flex flex-wrap gap-3 mt-5">

                                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">

                                    📍 {job.location}

                                </span>

                                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">

                                    💼 {job.employmentType}

                                </span>

                                <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full">

                                    ⭐ {job.experience} Years

                                </span>

                            </div>

                        </div>

                    </div>

                    <div className="text-right">

                        <p className="text-slate-500">

                            Salary

                        </p>

                        <h2 className="text-3xl font-bold text-green-600">

                            {formatSalary(job.salary)}

                        </h2>

                    </div>

                </div>

            </div>

            {/* Description */}

            <div className="bg-white rounded-2xl shadow-sm p-8">

                <h2 className="text-2xl font-bold mb-6">

                    Job Description

                </h2>

                <p className="leading-8 text-slate-700">

                    {job.description}

                </p>

            </div>

            {/* Skills */}

            <div className="bg-white rounded-2xl shadow-sm p-8">

                <h2 className="text-2xl font-bold mb-6">

                    Required Skills

                </h2>

                <div className="flex flex-wrap gap-3">

                    {

                        job.requirements.map((skill, index) => (

                            <span

                                key={index}

                                className="bg-slate-100 text-slate-700 px-4 py-2 rounded-xl"

                            >

                                {skill}

                            </span>

                        ))

                    }

                </div>

            </div>

            {/* Company */}

            <div className="bg-white rounded-2xl shadow-sm p-8">

                <h2 className="text-2xl font-bold mb-6">

                    Company

                </h2>

                <div className="space-y-3">

                    <p>

                        <strong>Name:</strong> {job.company.name}

                    </p>

                    <p>

                        <strong>Website:</strong>{" "}

                        <a

                            href={job.company.website}

                            target="_blank"

                            rel="noreferrer"

                            className="text-blue-600"

                        >

                            {job.company.website}

                        </a>

                    </p>

                    <p>

                        <strong>Location:</strong> {job.company.location}

                    </p>

                </div>

            </div>

            {/* Actions */}

            <div className="bg-white rounded-2xl shadow-sm p-8">

                <div className="flex gap-5">

                    <Link

                        to={`/candidate/apply/${job._id}`}

                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold"

                    >

                        Apply Now

                    </Link>

                    <Link

                        to="/candidate/jobs"

                        className="border px-8 py-4 rounded-xl"

                    >

                        Back to Jobs

                    </Link>

                </div>

            </div>

        </div>

    );

};

export default JobDetails;