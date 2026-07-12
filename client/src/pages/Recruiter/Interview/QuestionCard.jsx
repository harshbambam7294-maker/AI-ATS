import { useState } from "react";

const QuestionCard = ({
    question,
    index,
    difficulty
}) => {

    const [copied, setCopied] = useState(false);

    const copyQuestion = async () => {

        await navigator.clipboard.writeText(question);

        setCopied(true);

        setTimeout(() => {

            setCopied(false);

        }, 1500);

    };

    const badgeColor = {

        Easy: "bg-green-100 text-green-700",

        Medium: "bg-yellow-100 text-yellow-700",

        Hard: "bg-red-100 text-red-700"

    };

    return (

        <div className="bg-white rounded-xl shadow-sm border p-6">

            <div className="flex justify-between items-center">

                <h3 className="font-bold">

                    Question {index + 1}

                </h3>

                <span

                    className={`px-3 py-1 rounded-full text-sm ${badgeColor[difficulty]}`}

                >

                    {difficulty}

                </span>

            </div>

            <p className="mt-5 leading-8 text-slate-700">

                {question}

            </p>

            <div className="flex justify-end mt-6">

                <button

                    onClick={copyQuestion}

                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"

                >

                    {

                        copied ?

                            "Copied"

                            :

                            "Copy"

                    }

                </button>

            </div>

        </div>

    );

};

export default QuestionCard;