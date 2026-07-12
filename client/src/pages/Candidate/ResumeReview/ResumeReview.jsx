import { useEffect, useState } from "react";
import api from "../../../services/api";

const ResumeReview = () => {

    const [loading, setLoading] = useState(true);

    const [review, setReview] = useState(null);

    useEffect(() => {

        fetchReview();

    }, []);

    const fetchReview = async () => {

        try {

            const res = await api.get("/ai/review");

            setReview(res.data.review);

        }

        catch(err){

            console.log(err);

        }

        setLoading(false);

    };

    if(loading){

        return(

            <div className="flex justify-center items-center h-[70vh]">

                Generating AI Resume Review...

            </div>

        );

    }

    if(!review){

        return(

            <div className="text-center py-20">

                Resume Review Unavailable

            </div>

        );

    }

    return(

        <div className="space-y-8">

            <div className="bg-white rounded-2xl shadow-sm p-8">

                <h1 className="text-4xl font-bold">

                    AI Resume Review

                </h1>

                <p className="text-slate-500 mt-2">

                    AI powered ATS analysis of your resume.

                </p>

            </div>

            <div className="bg-white rounded-2xl shadow-sm p-10 text-center">

                <p className="text-slate-500">

                    ATS Score

                </p>

                <h2 className="text-7xl font-bold text-blue-600 mt-5">

                    {review.atsScore}%

                </h2>

            </div>

            <div className="grid lg:grid-cols-2 gap-8">

                <div className="bg-white rounded-2xl shadow-sm p-8">

                    <h2 className="text-2xl font-bold text-green-700 mb-6">

                        Strengths

                    </h2>

                    <div className="space-y-4">

                        {

                            review.strengths.map((item,index)=>(

                                <div

                                    key={index}

                                    className="bg-green-50 border border-green-200 rounded-xl p-4"

                                >

                                    {item}

                                </div>

                            ))

                        }

                    </div>

                </div>

                <div className="bg-white rounded-2xl shadow-sm p-8">

                    <h2 className="text-2xl font-bold text-red-700 mb-6">

                        Weaknesses

                    </h2>

                    <div className="space-y-4">

                        {

                            review.weaknesses.map((item,index)=>(

                                <div

                                    key={index}

                                    className="bg-red-50 border border-red-200 rounded-xl p-4"

                                >

                                    {item}

                                </div>

                            ))

                        }

                    </div>

                </div>

            </div>

            <div className="bg-white rounded-2xl shadow-sm p-8">

                <h2 className="text-2xl font-bold mb-6">

                    AI Suggestions

                </h2>

                <div className="space-y-4">

                    {

                        review.suggestions.map((item,index)=>(

                            <div

                                key={index}

                                className="bg-blue-50 border border-blue-200 rounded-xl p-4"

                            >

                                {item}

                            </div>

                        ))

                    }

                </div>

            </div>

        </div>

    );

};

export default ResumeReview;