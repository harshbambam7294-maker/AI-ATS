import { useEffect, useState } from "react";
import api from "../../../services/api";

const InterviewModal = ({ application, onClose }) => {

    const [loading, setLoading] = useState(true);

    const [questions, setQuestions] = useState(null);

    useEffect(() => {

        fetchQuestions();

    }, []);

    const fetchQuestions = async () => {

        try {

            const res = await api.post("/ai/interview", {

                candidateId: application.candidate._id,

                jobId: application.job._id

            });

            setQuestions(res.data.questions);

        }

        catch (err) {

            console.log(err);

        }

        setLoading(false);

    };

    if (loading) {

        return (

            <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

                <div className="bg-white rounded-2xl p-8">

                    Generating Questions...

                </div>

            </div>

        );

    }

    return (

        <div className="fixed inset-0 bg-black/40 overflow-y-auto z-50">

            <div className="max-w-5xl mx-auto bg-white rounded-2xl my-10 p-8">

                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-3xl font-bold">

                        AI Interview Questions

                    </h1>

                    <button

                        onClick={onClose}

                        className="text-red-600"

                    >

                        Close

                    </button>

                </div>

                {

                    Object.entries(questions).map(([section, list]) => (

                        <div key={section} className="mb-8">

                            <h2 className="text-2xl font-semibold capitalize mb-4">

                                {section}

                            </h2>

                            <div className="space-y-4">

                                {

                                    list.map((q, index) => (

                                        <div

                                            key={index}

                                            className="border rounded-xl p-4"

                                        >

                                            {q}

                                        </div>

                                    ))

                                }

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

};

export default InterviewModal;