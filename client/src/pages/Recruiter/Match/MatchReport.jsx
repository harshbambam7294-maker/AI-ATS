import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../../services/api";
import ActionPanel from "./ActionPanel";
import MatchScore from "./MatchScore";
import ProgressCard from "./ProgressCard";
import SkillSection from "./SkillSection";
import RecommendationCard from "./RecommendationCard";
import StrengthWeakness from "./StrengthWeakness";
import DecisionBadge from "./DecisionBadge";
import QuickStats from "./QuickStats";

const MatchReport = () => {

    const { candidateId, jobId } = useParams();

    const [loading, setLoading] = useState(true);

    const [match, setMatch] = useState(null);

    const [candidate, setCandidate] = useState(null);

    const [job, setJob] = useState(null);

    useEffect(() => {

        fetchMatch();

    }, []);

    const fetchMatch = async () => {

        try {

            const res = await api.post("/ai/match", {

                candidateId,

                jobId

            });

            setMatch(res.data.match);

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

            <div className="bg-white rounded-2xl shadow-sm p-8">

            <div className="flex justify-between items-start">

        <div>

            <h1 className="text-4xl font-bold">

                AI Candidate Match Report

            </h1>

            <p className="text-slate-500 mt-2">

                Generated using Gemini AI

            </p>

        </div>

        <Link
            to="/recruiter/applications"
            className="border px-5 py-3 rounded-xl hover:bg-slate-100"
        >
            ← Back
        </Link>

    </div>

    <div className="grid md:grid-cols-2 gap-8 mt-10">

        <div>

            <h3 className="text-slate-500 uppercase text-sm">

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

            <h3 className="text-slate-500 uppercase text-sm">

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

    <div className="border-t mt-8 pt-6 flex justify-between text-slate-500">

        <span>

            Report Generated

        </span>

        <span>

            {match?.createdAt
    ? new Date(match.createdAt).toLocaleDateString()
    : "-"}

        </span>

    </div>

</div>

        );

    }

    if (!match) {

        return (

            <div className="flex flex-col items-center justify-center h-screen">

                <h2 className="text-3xl font-bold mb-4">

                    Match Report Not Found

                </h2>

                <Link

                    to="/recruiter/applications"

                    className="bg-blue-600 text-white px-6 py-3 rounded-xl"

                >

                    Back to Applications

                </Link>

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto p-8 space-y-8">

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-4xl font-bold">

                        AI Candidate Match Report

                    </h1>

                    <p className="text-slate-500 mt-2">

                        AI Powered Candidate Evaluation

                    </p>

                </div>

                <Link

                    to="/recruiter/applications"

                    className="border px-5 py-3 rounded-xl hover:bg-slate-100"

                >

                    ← Back

                </Link>

            </div>

            <MatchScore
                score={match.overallScore}
            />

            <QuickStats match={match} />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <ProgressCard

                    title="Skill Match"

                    score={match.skillScore}

                    color="blue"

                />

                <ProgressCard

                    title="Experience"

                    score={match.experienceScore}

                    color="green"

                />

                <ProgressCard

                    title="Education"

                    score={match.educationScore}

                    color="purple"

                />

                <ProgressCard

                    title="Projects"

                    score={match.projectScore}

                    color="orange"

                />

            </div>

            <DecisionBadge
                score={match.overallScore}
            />

            <div className="grid lg:grid-cols-2 gap-8">

                <SkillSection

                    title="Matched Skills"

                    skills={match.matchedSkills || []}

                    type="matched"

                />

                <SkillSection

                    title="Missing Skills"

                    skills={match.missingSkills || []}

                    type="missing"

                />

            </div>

            <div className="grid lg:grid-cols-2 gap-8">

                <StrengthWeakness

                    title="Strengths"

                    items={match.strengths}

                    positive

                />

                <StrengthWeakness

                    title="Weaknesses"

                    items={match.weaknesses}

                />

            </div>

            <RecommendationCard

                recommendation={match.recommendation}

            />

            <ActionPanel

                candidateId={candidateId}

                jobId={jobId}

            />

        </div>

    );

};

export default MatchReport;