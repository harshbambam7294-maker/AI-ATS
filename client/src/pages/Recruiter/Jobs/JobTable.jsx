const JobTable = ({ jobs, onEdit, onDelete }) => {

    if (jobs.length === 0) {

        return (

            <div className="bg-white rounded-2xl shadow-sm p-10 text-center">

                <h2 className="text-2xl font-semibold">

                    No Jobs Found

                </h2>

                <p className="text-slate-500 mt-2">

                    Create your first job posting.

                </p>

            </div>

        );

    }

    return (

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

            <table className="w-full">

                <thead className="bg-slate-100">

                    <tr>

                        <th className="text-left px-6 py-4">
                            Title
                        </th>

                        <th className="text-left px-6 py-4">
                            Company
                        </th>

                        <th className="text-left px-6 py-4">
                            Location
                        </th>

                        <th className="text-left px-6 py-4">
                            Salary
                        </th>

                        <th className="text-left px-6 py-4">
                            Experience
                        </th>

                        <th className="text-left px-6 py-4">
                            Type
                        </th>

                        <th className="text-center px-6 py-4">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        jobs.map(job => (

                            <tr
                                key={job._id}
                                className="border-b hover:bg-slate-50"
                            >

                                <td className="px-6 py-5">

                                    <div>

                                        <h3 className="font-semibold">

                                            {job.title}

                                        </h3>

                                        <p className="text-slate-500 text-sm mt-1">

                                            {job.description.length > 70
                                                ? job.description.substring(0, 70) + "..."
                                                : job.description}

                                        </p>

                                    </div>

                                </td>

                                <td className="px-6">

                                    {job.company?.name}

                                </td>

                                <td className="px-6">

                                    {job.location}

                                </td>

                                <td className="px-6">

                                    ₹ {job.salary.toLocaleString()}

                                </td>

                                <td className="px-6">

                                    {job.experience} yrs

                                </td>

                                <td className="px-6">

                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">

                                        {job.employmentType}

                                    </span>

                                </td>

                                <td className="px-6">

                                    <div className="flex justify-center gap-3">

                                        <button

                                            onClick={() => onEdit(job)}

                                            className="bg-yellow-500 text-white px-4 py-2 rounded-lg"

                                        >

                                            Edit

                                        </button>

                                        <button

                                            onClick={() => onDelete(job)}

                                            className="bg-red-500 text-white px-4 py-2 rounded-lg"

                                        >

                                            Delete

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

};

export default JobTable;