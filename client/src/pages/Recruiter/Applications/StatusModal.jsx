import { useState } from "react";
import api from "../../../services/api";

const StatusModal = ({ application, onClose }) => {

    const [status, setStatus] = useState(application.status);

    const [loading, setLoading] = useState(false);

    const updateStatus = async () => {

        try {

            setLoading(true);

            await api.put(
                `/applications/${application._id}/status`,
                { status }
            );

            onClose();

        } catch (err) {

            console.log(err);

            alert("Failed to update status.");

        }

        setLoading(false);

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl p-8 w-[420px]">

                <h2 className="text-2xl font-bold mb-6">

                    Update Application Status

                </h2>

                <select

                    value={status}

                    onChange={(e) => setStatus(e.target.value)}

                    className="w-full border rounded-xl p-3"

                >

                    <option value="pending">Pending</option>

                    <option value="accepted">Accepted</option>

                    <option value="rejected">Rejected</option>

                </select>

                <div className="flex justify-end gap-4 mt-8">

                    <button

                        onClick={onClose}

                        className="px-5 py-2 rounded-xl border"

                    >

                        Cancel

                    </button>

                    <button

                        onClick={updateStatus}

                        disabled={loading}

                        className="bg-blue-600 text-white px-5 py-2 rounded-xl"

                    >

                        {loading ? "Updating..." : "Update"}

                    </button>

                </div>

            </div>

        </div>

    );

};

export default StatusModal;