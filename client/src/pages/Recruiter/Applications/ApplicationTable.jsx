import { Link } from "react-router-dom";

const getStatusColor = (status) => {

    switch (status?.toLowerCase()) {

        case "accepted":
            return "bg-green-100 text-green-700";

        case "rejected":
            return "bg-red-100 text-red-700";

        default:
            return "bg-yellow-100 text-yellow-700";

    }

};

const ApplicationTable = ({
    applications,
    onStatus,
    onInterview
}) => {

    if (applications.length === 0) {

        return (

            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">

                <h2 className="text-2xl font-semibold">

                    No Applications Found

                </h2>

                <p className="text-slate-500 mt-2">

                    Applications will appear here once candidates apply.

                </p>

            </div>

        );

    }

    return (

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

            <table className="w-full">

                <thead className="bg-slate-100">

                    <tr>

                        <th className="px-6 py-4 text-left">

                            Candidate

                        </th>

                        <th className="px-6 py-4 text-left">

                            Job

                        </th>

                        <th className="px-6 py-4 text-center">

                            Resume

                        </th>

                        <th className="px-6 py-4 text-center">

                            AI Match

                        </th>

                        <th className="px-6 py-4 text-center">

                            Interview

                        </th>

                        <th className="px-6 py-4 text-center">

                            Status

                        </th>

                        <th className="px-6 py-4 text-center">

                            Action

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        applications.map((app) => (

                            <tr

                                key={app._id}

                                className="border-b hover:bg-slate-50 transition"

                            >

                                {/* Candidate */}

                                <td className="px-6 py-5">

                                    <div>

                                        <h3 className="font-semibold text-slate-800">

                                            {app.candidate.name}

                                        </h3>

                                        <p className="text-sm text-slate-500">

                                            {app.candidate.email}

                                        </p>

                                    </div>

                                </td>

                                {/* Job */}

                                <td className="px-6">

                                    <div className="font-medium">

                                        {app.job.title}

                                    </div>

                                </td>

                                {/* Resume */}

                                <td className="text-center">

                                    {

                                        app.candidate.resume ?

                                            <a

                                                href={app.candidate.resume}

                                                target="_blank"

                                                rel="noreferrer"

                                                className="text-blue-600 hover:underline"

                                            >

                                                View Resume

                                            </a>

                                            :

                                            <span className="text-slate-400">

                                                No Resume

                                            </span>

                                    }

                                </td>

                                {/* AI Match */}

                                <td className="text-center">

                                    <Link

                                        to={`/recruiter/match/${app.candidate._id}/${app.job._id}`}

                                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"

                                    >

                                        AI Report

                                    </Link>

                                </td>

                                {/* Interview */}

                                <td className="text-center">

                                    <Link
                                        to={`/recruiter/interview/${app.candidate._id}/${app.job._id}`}
                                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
                                    >
                                         Interview Kit
                                    </Link>

                                </td>

                                {/* Status */}

                                <td className="text-center">

                                    <span

                                        className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}

                                    >

                                        {app.status}

                                    </span>

                                </td>

                                {/* Update */}

                                <td className="text-center">

                                    <button

                                        onClick={() => onStatus(app)}

                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"

                                    >

                                        Update

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

};

export default ApplicationTable;