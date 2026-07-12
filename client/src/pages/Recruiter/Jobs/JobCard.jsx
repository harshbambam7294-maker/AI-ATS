const JobCard = ({ job, onEdit, onDelete }) => {

    return (

        <div className="bg-white rounded-2xl shadow-sm p-6">

            <h2 className="text-2xl font-bold">

                {job.title}

            </h2>

            <p className="text-slate-500 mt-2">

                {job.company?.name}

            </p>

            <div className="mt-5 space-y-2">

                <p>

                    📍 {job.location}

                </p>

                <p>

                    💰 ₹ {job.salary.toLocaleString()}

                </p>

                <p>

                    💼 {job.employmentType}

                </p>

                <p>

                    ⭐ {job.experience} Years

                </p>

            </div>

            <div className="flex gap-3 mt-6">

                <button

                    onClick={() => onEdit(job)}

                    className="flex-1 bg-yellow-500 text-white py-2 rounded-xl"

                >

                    Edit

                </button>

                <button

                    onClick={() => onDelete(job)}

                    className="flex-1 bg-red-500 text-white py-2 rounded-xl"

                >

                    Delete

                </button>

            </div>

        </div>

    );

};

export default JobCard;