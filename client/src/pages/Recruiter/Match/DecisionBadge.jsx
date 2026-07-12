const DecisionBadge = ({ score }) => {

    let decision = "";

    let color = "";

    let icon = "";

    if (score >= 85) {

        decision = "Highly Recommended";

        icon = "🟢";

        color =
            "bg-green-100 text-green-700 border-green-200";

    }

    else if (score >= 70) {

        decision = "Recommended";

        icon = "🔵";

        color =
            "bg-blue-100 text-blue-700 border-blue-200";

    }

    else if (score >= 50) {

        decision = "Consider After Upskilling";

        icon = "🟡";

        color =
            "bg-yellow-100 text-yellow-700 border-yellow-200";

    }

    else {

        decision = "Not Recommended";

        icon = "🔴";

        color =
            "bg-red-100 text-red-700 border-red-200";

    }

    return (

        <div className={`rounded-2xl border p-8 ${color}`}>

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-2xl font-bold">

                        Hiring Decision

                    </h2>

                    <p className="mt-2 opacity-80">

                        AI recommendation based on the overall candidate
                        compatibility score.

                    </p>

                </div>

                <div className="text-right">

                    <p className="text-5xl">

                        {icon}

                    </p>

                    <p className="mt-3 text-xl font-bold">

                        {decision}

                    </p>

                </div>

            </div>

        </div>

    );

};

export default DecisionBadge;