import { useNavigate } from "react-router-dom";

const ActionPanel = ({ candidateId, jobId }) => {

    const navigate = useNavigate();

    return (

        <div className="bg-white rounded-2xl shadow-sm border p-8">

            <h2 className="text-2xl font-bold mb-6">

                Recruiter Actions

            </h2>

            <div className="grid md:grid-cols-3 gap-5">

                <button

                    onClick={() =>
                        navigate(`/recruiter/interview/${candidateId}/${jobId}`)
                    }

                    className="bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-xl py-4 font-semibold"

                >

                    Generate Interview

                </button>

                <button

                    onClick={() =>
                        navigate("/recruiter/applications")
                    }

                    className="bg-green-600 hover:bg-green-700 transition text-white rounded-xl py-4 font-semibold"

                >

                    Back to Applications

                </button>

                <button

                    onClick={() => window.print()}

                    className="bg-slate-700 hover:bg-slate-800 transition text-white rounded-xl py-4 font-semibold"

                >

                    Download Report

                </button>

            </div>

        </div>

    );

};

export default ActionPanel;