import { Link } from "react-router-dom";

const InterviewActions = () => {

    return (

        <div className="bg-white rounded-2xl shadow-sm p-8">

            <h2 className="text-2xl font-bold mb-8">

                Recruiter Actions

            </h2>

            <div className="grid md:grid-cols-3 gap-5">

                <button

                    onClick={() => window.print()}

                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-4 font-semibold"

                >

                    Download PDF

                </button>

                <button

                    onClick={() => navigator.clipboard.writeText(document.body.innerText)}

                    className="bg-green-600 hover:bg-green-700 text-white rounded-xl py-4 font-semibold"

                >

                    Copy Interview Kit

                </button>

                <Link

                    to="/recruiter/applications"

                    className="bg-slate-700 hover:bg-slate-800 text-white rounded-xl py-4 text-center font-semibold"

                >

                    Back to Applications

                </Link>

            </div>

        </div>

    );

};

export default InterviewActions;