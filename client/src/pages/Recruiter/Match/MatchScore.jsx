const MatchScore = ({ score }) => {

    const getStatus = () => {

        if (score >= 85) {

            return {
                label: "Excellent Match",
                color: "text-green-600",
                bg: "bg-green-100"
            };

        }

        if (score >= 70) {

            return {
                label: "Good Match",
                color: "text-blue-600",
                bg: "bg-blue-100"
            };

        }

        if (score >= 50) {

            return {
                label: "Average Match",
                color: "text-yellow-600",
                bg: "bg-yellow-100"
            };

        }

        return {
            label: "Poor Match",
            color: "text-red-600",
            bg: "bg-red-100"
        };

    };

    const status = getStatus();

    return (

        <div className="bg-white rounded-2xl shadow-sm p-10">

            <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

                {/* Left */}

                <div>

                    <h2 className="text-3xl font-bold">

                        Overall Candidate Match

                    </h2>

                    <p className="text-slate-500 mt-3">

                        AI-generated compatibility score based on skills,
                        experience, education and projects.

                    </p>

                    <div
                        className={`inline-block mt-6 px-5 py-2 rounded-full font-semibold ${status.bg} ${status.color}`}
                    >

                        {status.label}

                    </div>

                </div>

                {/* Right */}

                <div className="relative">

                    <div

                        className="w-52 h-52 rounded-full flex items-center justify-center"

                        style={{
                            background: `conic-gradient(
                                #2563eb ${score * 3.6}deg,
                                #e5e7eb ${score * 3.6}deg
                            )`
                        }}

                    >

                        <div className="w-40 h-40 bg-white rounded-full flex flex-col items-center justify-center">

                            <p className="text-6xl font-bold text-blue-600">

                                {score}

                            </p>

                            <p className="text-lg text-slate-500">

                                %

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default MatchScore;