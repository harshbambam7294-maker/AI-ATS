const ProgressCard = ({ title, score, color = "blue" }) => {

    const colors = {
        blue: {
            bg: "bg-blue-100",
            text: "text-blue-600",
            bar: "bg-blue-600"
        },
        green: {
            bg: "bg-green-100",
            text: "text-green-600",
            bar: "bg-green-600"
        },
        purple: {
            bg: "bg-purple-100",
            text: "text-purple-600",
            bar: "bg-purple-600"
        },
        orange: {
            bg: "bg-orange-100",
            text: "text-orange-600",
            bar: "bg-orange-600"
        }
    };

    const theme = colors[color] || colors.blue;

    return (

        <div className="bg-white rounded-2xl shadow-sm p-6">

            <div className="flex justify-between items-center mb-4">

                <h3 className="font-semibold text-lg">

                    {title}

                </h3>

                <div
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${theme.bg} ${theme.text}`}
                >

                    {score}%

                </div>

            </div>

            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">

                <div

                    className={`${theme.bar} h-3 rounded-full transition-all duration-700 ease-out`}

                    style={{
                        width: `${score}%`
                    }}

                />

            </div>

            <div className="flex justify-between text-sm text-slate-500 mt-3">

                <span>

                    0%

                </span>

                <span>

                    100%

                </span>

            </div>

        </div>

    );

};

export default ProgressCard;