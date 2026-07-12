const getStatus = (status) => {

    switch (status) {

        case "accepted":

            return {
                bg: "bg-green-100",
                text: "text-green-700"
            };

        case "rejected":

            return {
                bg: "bg-red-100",
                text: "text-red-700"
            };

        default:

            return {
                bg: "bg-yellow-100",
                text: "text-yellow-700"
            };

    }

};

const formatSalary = (salary) => {

    if (!salary) return "Not Disclosed";

    if (salary >= 100000) {

        return `₹${(salary / 100000).toFixed(1)} LPA`;

    }

    return `₹${salary}`;

};

const ApplicationCard = ({
    application,
    onWithdraw
}) => {

    const status = getStatus(application.status);

    return (

        <div className="bg-white rounded-2xl shadow-sm border p-6">

            <div className="flex justify-between items-start">

                <div>

                    <h2 className="text-2xl font-bold">

                        {application.job.title}

                    </h2>

                    <p className="text-slate-500 mt-1">

                        {application.job.company.name}

                    </p>

                </div>

                <span

                    className={`px-4 py-2 rounded-full font-medium ${status.bg} ${status.text}`}

                >

                    {application.status}

                </span>

            </div>

            <div className="grid grid-cols-2 gap-5 mt-8">

                <div>

                    <p className="text-slate-500">

                        Location

                    </p>

                    <h3 className="font-semibold">

                        {application.job.location}

                    </h3>

                </div>

                <div>

                    <p className="text-slate-500">

                        Salary

                    </p>

                    <h3 className="font-semibold">

                        {formatSalary(application.job.salary)}

                    </h3>

                </div>

                <div>

                    <p className="text-slate-500">

                        Employment

                    </p>

                    <h3 className="font-semibold">

                        {application.job.employmentType}

                    </h3>

                </div>

                <div>

                    <p className="text-slate-500">

                        Applied On

                    </p>

                    <h3 className="font-semibold">

                        {new Date(application.createdAt).toLocaleDateString()}

                    </h3>

                </div>

            </div>

            <div className="mt-8 border-t pt-6 flex justify-end">

                {

                    application.status === "pending" &&

                    <button

                        onClick={() =>
                            onWithdraw(application._id)
                        }

                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl"

                    >

                        Withdraw Application

                    </button>

                }

            </div>

        </div>

    );

};

export default ApplicationCard;