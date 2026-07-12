const InterviewSummary = ({ questions }) => {

    const totalQuestions =
        (questions?.technical?.length || 0) +
        (questions?.behavioral?.length || 0) +
        (questions?.project?.length || 0) +
        (questions?.hr?.length || 0);

    return (

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            <div className="bg-white rounded-2xl shadow-sm p-6">

                <p className="text-slate-500">

                    Total Questions

                </p>

                <h2 className="text-5xl font-bold mt-3 text-blue-600">

                    {totalQuestions}

                </h2>

            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">

                <p className="text-slate-500">

                    Categories

                </p>

                <h2 className="text-5xl font-bold mt-3 text-purple-600">

                    4

                </h2>

            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">

                <p className="text-slate-500">

                    Estimated Time

                </p>

                <h2 className="text-4xl font-bold mt-4 text-green-600">

                    45 min

                </h2>

            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">

                <p className="text-slate-500">

                    AI Engine

                </p>

                <h2 className="text-3xl font-bold mt-5 text-orange-600">

                    Gemini

                </h2>

            </div>

        </div>

    );

};

export default InterviewSummary;