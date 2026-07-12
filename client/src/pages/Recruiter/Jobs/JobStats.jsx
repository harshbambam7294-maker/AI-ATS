const JobStats = ({ jobs }) => {

    const active = jobs.filter(job => job.isActive).length;

    const inactive = jobs.length - active;

    return (

        <div className="grid md:grid-cols-3 gap-5">

            <div className="bg-white rounded-2xl shadow-sm p-6">

                <h3>Total Jobs</h3>

                <p className="text-4xl font-bold mt-3">

                    {jobs.length}

                </p>

            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">

                <h3>Active</h3>

                <p className="text-4xl font-bold text-green-600 mt-3">

                    {active}

                </p>

            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">

                <h3>Inactive</h3>

                <p className="text-4xl font-bold text-red-600 mt-3">

                    {inactive}

                </p>

            </div>

        </div>

    );

};

export default JobStats;