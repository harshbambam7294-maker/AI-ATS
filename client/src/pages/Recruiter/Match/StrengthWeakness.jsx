const StrengthWeakness = ({
    title,
    items = [],
    positive = false
}) => {

    const theme = positive
        ? {
            icon: "💪",
            heading: "text-green-700",
            border: "border-green-200",
            bg: "bg-green-50",
            badge: "bg-green-100 text-green-700"
        }
        : {
            icon: "⚠️",
            heading: "text-red-700",
            border: "border-red-200",
            bg: "bg-red-50",
            badge: "bg-red-100 text-red-700"
        };

    return (

        <div className={`bg-white rounded-2xl shadow-sm border ${theme.border} p-6`}>

            <div className="flex items-center gap-3 mb-6">

                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${theme.badge}`}>

                    {theme.icon}

                </div>

                <div>

                    <h2 className={`text-2xl font-bold ${theme.heading}`}>

                        {title}

                    </h2>

                    <p className="text-slate-500 text-sm">

                        AI generated analysis

                    </p>

                </div>

            </div>

            {

                items.length === 0 ?

                    (

                        <div className="text-slate-500 italic">

                            No observations available.

                        </div>

                    )

                    :

                    (

                        <div className="space-y-4">

                            {

                                items.map((item, index) => (

                                    <div

                                        key={index}

                                        className={`rounded-xl border ${theme.border} ${theme.bg} p-4 transition hover:shadow-md`}

                                    >

                                        <div className="flex gap-3">

                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${theme.badge}`}>

                                                {index + 1}

                                            </div>

                                            <p className="text-slate-700 leading-7">

                                                {item}

                                            </p>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    )

            }

        </div>

    );

};

export default StrengthWeakness;