import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../services/api";

import InterviewSummary from "./InterviewSummary";
import QuestionSection from "./QuestionSection";
import InterviewActions from "./InterviewActions";

const InterviewReport = () => {

    const { candidateId, jobId } = useParams();

    const [loading, setLoading] = useState(true);

    const [questions, setQuestions] = useState(null);

    const [candidate, setCandidate] = useState(null);

    const [job, setJob] = useState(null);

    useEffect(() => {

        fetchQuestions();

    }, []);

    const fetchQuestions = async () => {

        try {

            const res = await api.post("/ai/interview", {

                candidateId,

                jobId

            });

            setQuestions(res.data.questions);

            setCandidate(res.data.candidate);

            setJob(res.data.job);

        }

        catch (err) {

            console.log(err);

        }

        setLoading(false);

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-screen">

                Generating Interview Kit...

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto p-8 space-y-8">

            <div className="bg-white rounded-2xl shadow-sm p-8">

                <div className="flex justify-between">

                    <div>

                        <h1 className="text-4xl font-bold">

                            AI Interview Kit

                        </h1>

                        <p className="text-slate-500 mt-2">

                            Generated using Gemini AI

                        </p>

                    </div>

                    <Link

                        to="/recruiter/applications"

                        className="border rounded-xl px-5 py-3"

                    >

                        ← Back

                    </Link>

                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-8">

                    <div>

                        <h3 className="uppercase text-sm text-slate-500">

                            Candidate

                        </h3>

                        <h2 className="text-2xl font-bold mt-2">

                            {candidate?.name}

                        </h2>

                        <p className="text-slate-500">

                            {candidate?.email}

                        </p>

                    </div>

                    <div>

                        <h3 className="uppercase text-sm text-slate-500">

                            Job

                        </h3>

                        <h2 className="text-2xl font-bold mt-2">

                            {job?.title}

                        </h2>

                        <p className="text-slate-500">

                            {job?.company?.name}

                        </p>

                    </div>

                </div>

            </div>

            <InterviewSummary

                questions={questions}

            />

            <QuestionSection

                title="Technical Questions"

                icon="💻"

                color="blue"

                questions={questions.technical}

            />

            <QuestionSection

                title="Project Questions"

                icon="📁"

                color="purple"

                questions={questions.project}

            />

            <QuestionSection

                title="Behavioral Questions"

                icon="🤝"

                color="green"

                questions={questions.behavioral}

            />

            <QuestionSection

                title="HR Questions"

                icon="👔"

                color="orange"

                questions={questions.hr}

            />

            <InterviewActions />

        </div>

    );

};

export default InterviewReport;