const getStatusColor = (status) => {

    switch (status) {

        case "accepted":
            return "bg-green-100 text-green-700";

        case "rejected":
            return "bg-red-100 text-red-700";

        default:
            return "bg-yellow-100 text-yellow-700";

    }

};

const RecentApplications = ({ applications }) => {

    return (

        <div className="bg-white rounded-2xl shadow-sm p-8">

            <div className="flex justify-between items-center mb-8">

                <h2 className="text-2xl font-bold">

                    Recent Applications

                </h2>

            </div>

            {

                applications.length === 0 ?

                    (

                        <div className="text-center py-12 text-slate-500">

                            No applications yet.

                        </div>

                    )

                    :

                    (

                        <div className="space-y-5">

                            {

                                applications
                                .filter(app=>app.job)
                                .map(app => (

                                    <div

                                        key={app._id}

                                        className="border rounded-xl p-5 flex justify-between items-center"

                                    >

                                        <div>

                                            <h3 className="font-semibold text-lg">

                                                {app.job.title}

                                            </h3>

                                            <p className="text-slate-500">

                                                {app.job.company.name}

                                            </p>

                                            <p className="text-sm text-slate-400 mt-1">

                                                {app.job.location} • {app.job.employmentType}

                                            </p>

                                        </div>

                                        <span

                                            className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}

                                        >

                                            {app.status}

                                        </span>

                                    </div>

                                ))

                            }

                        </div>

                    )

            }

        </div>

    );

};

export default RecentApplications;