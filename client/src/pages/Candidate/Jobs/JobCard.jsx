import { Link } from "react-router-dom";

const formatSalary = (salary) => {

    if (!salary) return "Not Disclosed";

    if (salary >= 10000000) {

        return `₹${(salary / 10000000).toFixed(1)} Cr`;

    }

    if (salary >= 100000) {

        return `₹${(salary / 100000).toFixed(1)} LPA`;

    }

    return `₹${salary}`;

};

const JobCard = ({ job }) => {

    return (

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

            {/* Company */}

            <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">

                    {job.company?.name?.charAt(0)}

                </div>

                <div>

                    <h3 className="text-xl font-bold">

                        {job.title}

                    </h3>

                    <p className="text-slate-500">

                        {job.company?.name}

                    </p>

                </div>

            </div>

            {/* Description */}

            <p className="text-slate-600 mt-6 line-clamp-3">

                {job.description}

            </p>

            {/* Tags */}

            <div className="flex flex-wrap gap-2 mt-6">

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                    {job.location}

                </span>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                    {job.employmentType}

                </span>

                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">

                    {job.experience} Years

                </span>

            </div>

            {/* Salary */}

            <div className="mt-6">

                <p className="text-slate-500 text-sm">

                    Salary

                </p>

                <h2 className="text-2xl font-bold text-green-600">

                    {formatSalary(job.salary)}

                </h2>

            </div>

            {/* Skills */}

            <div className="flex flex-wrap gap-2 mt-6">

                {

                    job.requirements?.slice(0, 4).map((skill, index) => (

                        <span

                            key={index}

                            className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm"

                        >

                            {skill}

                        </span>

                    ))

                }

            </div>

            {/* Footer */}

            <div className="flex justify-between items-center mt-8">

                <span className="text-slate-400 text-sm">

                    {new Date(job.createdAt).toLocaleDateString()}

                </span>

                <Link

                    to={`/candidate/jobs/${job._id}`}

                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"

                >

                    View Details

                </Link>

            </div>

        </div>

    );

};

export default JobCard;