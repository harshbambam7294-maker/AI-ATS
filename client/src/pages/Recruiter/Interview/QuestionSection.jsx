import QuestionCard from "./QuestionCard";

const QuestionSection = ({
    title,
    icon,
    color,
    questions
}) => {

    const difficulties = [

        "Easy",

        "Medium",

        "Hard"

    ];

    return (

        <div className="bg-slate-50 rounded-2xl p-8">

            <div className="flex items-center gap-4 mb-8">

                <div className="text-4xl">

                    {icon}

                </div>

                <h2 className="text-3xl font-bold">

                    {title}

                </h2>

            </div>

            <div className="space-y-6">

                {

                    questions.map((question, index) => (

                        <QuestionCard

                            key={index}

                            index={index}

                            question={question}

                            difficulty={

                                difficulties[
                                    Math.min(index, 2)
                                ]
                            }

                        />

                    ))

                }

            </div>

        </div>

    );

};

export default QuestionSection;