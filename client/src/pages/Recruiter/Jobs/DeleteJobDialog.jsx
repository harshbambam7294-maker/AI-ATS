import api from "../../../services/api";

const DeleteJobDialog = ({ job, onClose }) => {

    const handleDelete = async () => {

        try {

            await api.delete(`/jobs/${job._id}`);

            onClose();

        } catch (err) {

            console.log(err);

            alert("Unable to delete job.");

        }

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl p-8 w-[420px]">

                <h2 className="text-2xl font-bold">

                    Delete Job

                </h2>

                <p className="mt-4 text-slate-600">

                    Are you sure you want to delete

                    <span className="font-semibold">

                        {" "} {job.title}

                    </span>

                    ?

                </p>

                <div className="flex justify-end gap-4 mt-8">

                    <button

                        onClick={onClose}

                        className="border px-5 py-2 rounded-xl"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={handleDelete}

                        className="bg-red-600 text-white px-5 py-2 rounded-xl"

                    >

                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

};

export default DeleteJobDialog;