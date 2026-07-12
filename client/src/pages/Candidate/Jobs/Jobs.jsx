import { useEffect, useState } from "react";
import api from "../../../services/api";

import JobCard from "./JobCard";
import JobFilters from "./JobFilters";

const Jobs = () => {

    const [jobs, setJobs] = useState([]);

    const [filteredJobs, setFilteredJobs] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [location, setLocation] = useState("");

    const [employmentType, setEmploymentType] = useState("");

    useEffect(() => {

        fetchJobs();

    }, []);

    useEffect(() => {

        filterJobs();

    }, [jobs, search, location, employmentType]);

    const fetchJobs = async () => {

        try {

            const res = await api.get("/jobs/public");

            setJobs(res.data.jobs);

        }

        catch (err) {

            console.log(err);

        }

        setLoading(false);

    };

    const filterJobs = () => {

        let data = [...jobs];

        if (search) {

            data = data.filter(job =>

                job.title
                    .toLowerCase()
                    .includes(search.toLowerCase())

                ||

                job.company.name
                    .toLowerCase()
                    .includes(search.toLowerCase())

            );

        }

        if (location) {

            data = data.filter(job =>

                job.location === location

            );

        }

        if (employmentType) {

            data = data.filter(job =>

                job.employmentType === employmentType

            );

        }

        setFilteredJobs(data);

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-[70vh]">

                Loading Jobs...

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold">

                    Find Your Dream Job

                </h1>

                <p className="text-slate-500 mt-2">

                    Explore opportunities from top companies.

                </p>

            </div>

            <JobFilters

                search={search}

                setSearch={setSearch}

                location={location}

                setLocation={setLocation}

                employmentType={employmentType}

                setEmploymentType={setEmploymentType}

            />

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                {

                    filteredJobs.map(job => (

                        <JobCard

                            key={job._id}

                            job={job}

                        />

                    ))

                }

            </div>

        </div>

    );

};

export default Jobs;