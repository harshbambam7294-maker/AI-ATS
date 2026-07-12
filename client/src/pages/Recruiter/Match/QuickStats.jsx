const QuickStats = ({ match }) => {

    return (

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

            <div className="bg-white rounded-xl shadow-sm p-6">

                <p className="text-slate-500">

                    Matched Skills

                </p>

                <h2 className="text-4xl font-bold mt-3 text-green-600">

                    {match.matchedSkills?.length || 0}

                </h2>

            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">

                <p className="text-slate-500">

                    Missing Skills

                </p>

                <h2 className="text-4xl font-bold mt-3 text-red-600">

                    {match.missingSkills?.length || 0}

                </h2>

            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">

                <p className="text-slate-500">

                    Strengths

                </p>

                <h2 className="text-4xl font-bold mt-3 text-green-600">

                    {match.strengths?.length || 0}

                </h2>

            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">

                <p className="text-slate-500">

                    Weaknesses

                </p>

                <h2 className="text-4xl font-bold mt-3 text-orange-600">

                    {match.weaknesses?.length || 0}

                </h2>

            </div>

        </div>

    );

};

export default QuickStats;