const SkillSection = ({
    title,
    skills = [],
    type = "matched"
}) => {

    const isMatched = type === "matched";

    const styles = isMatched
        ? {
            container: "border-green-200",
            heading: "text-green-700",
            pill: "bg-green-100 text-green-700 border-green-200",
            icon: "✓"
        }
        : {
            container: "border-red-200",
            heading: "text-red-700",
            pill: "bg-red-100 text-red-700 border-red-200",
            icon: "✗"
        };

    return (

        <div className={`bg-white rounded-2xl shadow-sm border ${styles.container} p-6`}>

            <div className="flex items-center gap-3 mb-6">

                <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${styles.pill}`}
                >
                    {styles.icon}
                </div>

                <h2 className={`text-2xl font-bold ${styles.heading}`}>

                    {title}

                </h2>

            </div>

            {

                skills.length === 0 ?

                    <div className="text-slate-500 italic">

                        No skills available.

                    </div>

                    :

                    <div className="flex flex-wrap gap-3">

                        {

                            skills.map((skill, index) => (

                                <span

                                    key={index}

                                    className={`px-4 py-2 rounded-full border font-medium transition hover:scale-105 ${styles.pill}`}

                                >

                                    {skill}

                                </span>

                            ))

                        }

                    </div>

            }

            <div className="mt-6 text-sm text-slate-500">

                {

                    isMatched ?

                        `${skills.length} skill${skills.length !== 1 ? "s" : ""} matched.`

                        :

                        `${skills.length} skill${skills.length !== 1 ? "s are" : " is"} missing.`

                }

            </div>

        </div>

    );

};

export default SkillSection;