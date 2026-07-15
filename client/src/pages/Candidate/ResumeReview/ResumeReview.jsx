import { useEffect, useState } from "react";
import api from "../../../services/api";

const ResumeReview = () => {

    const [loading, setLoading] = useState(true);

    const [review, setReview] = useState(null);

    const [parsedResume, setParsedResume] = useState(null);

    const [generating,setGenerating] = useState(false);

    const generateReview = async () => {

    try{

        setGenerating(true);

        await api.post("/ai/generate-review");

        fetchReview();

    }

    catch(err){

        alert(

            err.response?.data?.message ||

            "Failed to generate review."

        );

    }

    setGenerating(false);

};

    useEffect(() => {

        fetchReview();

    }, []);

    const fetchReview = async () => {

        try {

            const res = await api.get("/ai/review");

            setReview(res.data.review);

            setParsedResume(res.data.parsedResume);

        }

        catch (err) {

            console.log(err);

        }

        setLoading(false);

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-[70vh]">

                Generating AI Resume Intelligence...

            </div>

        );

    }

    if (!review) {

        return (

            <div className="text-center py-20">

                Resume Review Unavailable

            </div>

        );

    }

    return (

        <div className="space-y-8">

            {/* Header */}

            <div className="bg-white rounded-2xl shadow-sm p-8">

                <h1 className="text-4xl font-bold">

                    🤖 AI Resume Intelligence

                </h1>

                <p className="text-slate-500 mt-3">

                    Comprehensive AI analysis of your resume including ATS score,

                    recruiter insights and structured resume parsing.

                </p>

            </div>

            {/* ATS Score */}

            <div className="bg-white rounded-2xl shadow-sm p-10 text-center">

                <p className="text-slate-500 text-lg">

                    ATS Compatibility Score

                </p>

                <h2 className="text-7xl font-bold text-blue-600 mt-5">

                    {

review.atsScore === 0 ?

(

<div className="text-center">

    <p className="text-slate-500 mb-6">

        AI Review hasn't been generated yet.

    </p>

    <button

        onClick={generateReview}

        disabled={generating}

        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"

    >

        {

            generating

            ?

            "Generating..."

            :

            "⚡ Generate AI Review"

        }

    </button>

</div>

)

:

(

<>

<p className="text-slate-500">

ATS Compatibility Score

</p>

<h2 className="text-7xl font-bold text-blue-600 mt-4">

{review.atsScore}%

</h2>

</>

)

}

                </h2>

                <p className="mt-4 text-slate-600">

                    {

                        review.atsScore >= 85

                            ? "Excellent Resume"

                            : review.atsScore >= 70

                            ? "Good Resume"

                            : "Needs Improvement"

                    }

                </p>

            </div>

            {/* Professional Summary */}

            <div className="bg-white rounded-2xl shadow-sm p-8">

                <h2 className="text-2xl font-bold mb-6">

                    📝 Professional Summary

                </h2>

                <p className="leading-8 text-slate-700">

                    {

                        parsedResume?.summary ||

                        "AI could not generate a professional summary for this resume."

                    }

                </p>

            </div>

            {/* Skills */}

            <div className="bg-white rounded-2xl shadow-sm p-8">

                <h2 className="text-2xl font-bold mb-6">

                    🧠 Technical Skills

                </h2>

                <div className="flex flex-wrap gap-3">

                    {

                        parsedResume?.skills?.map((skill,index)=>(

                            <span

                                key={index}

                                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full"

                            >

                                {skill}

                            </span>

                        ))

                    }

                </div>

            </div>

                        {/* Education */}

            <div className="bg-white rounded-2xl shadow-sm p-8">

                <h2 className="text-2xl font-bold mb-6">

                    🎓 Education

                </h2>

                <div className="space-y-5">

                    {

                        parsedResume?.education?.length > 0 ?

                        parsedResume.education.map((edu,index)=>(

                            <div

                                key={index}

                                className="border border-slate-200 rounded-xl p-5"

                            >

                                <h3 className="text-lg font-semibold">

                                    {edu.degree}

                                </h3>

                                <p className="text-slate-600 mt-1">

                                    {edu.institution}

                                </p>

                                {

                                    edu.location &&

                                    <p className="text-slate-500 mt-1">

                                        📍 {edu.location}

                                    </p>

                                }

                                <div className="flex flex-wrap gap-6 mt-3 text-sm text-slate-500">

                                    {

                                        edu.cgpa &&

                                        <span>

                                            CGPA : {edu.cgpa}

                                        </span>

                                    }

                                    {

                                        edu.percentage &&

                                        <span>

                                            Percentage : {edu.percentage}

                                        </span>

                                    }

                                    {

                                        edu.year &&

                                        <span>

                                            {edu.year}

                                        </span>

                                    }

                                </div>

                            </div>

                        ))

                        :

                        <p className="text-slate-500">

                            Education details unavailable.

                        </p>

                    }

                </div>

            </div>


            {/* Experience */}

            <div className="bg-white rounded-2xl shadow-sm p-8">

                <h2 className="text-2xl font-bold mb-6">

                    💼 Experience

                </h2>

                <div className="space-y-5">

                    {

                        parsedResume?.experience?.length > 0 ?

                        parsedResume.experience.map((exp,index)=>(

                            <div

                                key={index}

                                className="border border-slate-200 rounded-xl p-5"

                            >

                                <div className="flex justify-between">

                                    <div>

                                        <h3 className="text-lg font-semibold">

                                            {exp.role}

                                        </h3>

                                        {

                                            exp.company &&

                                            <p className="text-blue-600 mt-1">

                                                {exp.company}

                                            </p>

                                        }

                                    </div>

                                    {

                                        exp.duration &&

                                        <span className="text-slate-500">

                                            {exp.duration}

                                        </span>

                                    }

                                </div>

                                {

                                    exp.location &&

                                    <p className="text-slate-500 mt-2">

                                        📍 {exp.location}

                                    </p>

                                }

                                <p className="mt-4 text-slate-700 leading-7">

                                    {exp.description}

                                </p>

                            </div>

                        ))

                        :

                        <p className="text-slate-500">

                            Experience not found.

                        </p>

                    }

                </div>

            </div>


            {/* Projects */}

            <div className="bg-white rounded-2xl shadow-sm p-8">

                <h2 className="text-2xl font-bold mb-6">

                    🚀 Projects

                </h2>

                <div className="space-y-6">

                    {

                        parsedResume?.projects?.length > 0 ?

                        parsedResume.projects.map((project,index)=>(

                            <div

                                key={index}

                                className="border border-slate-200 rounded-xl p-5"

                            >

                                <h3 className="text-xl font-semibold">

                                    {project.title}

                                </h3>

                                <p className="mt-3 text-slate-700 leading-7">

                                    {project.description}

                                </p>

                                {

                                    project.technologies?.length > 0 &&

                                    <div className="flex flex-wrap gap-2 mt-5">

                                        {

                                            project.technologies.map((tech,i)=>(

                                                <span

                                                    key={i}

                                                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"

                                                >

                                                    {tech}

                                                </span>

                                            ))

                                        }

                                    </div>

                                }

                                <div className="flex gap-6 mt-5">

                                    {

                                        project.github &&

                                        <a

                                            href={project.github}

                                            target="_blank"

                                            rel="noreferrer"

                                            className="text-blue-600"

                                        >

                                            GitHub

                                        </a>

                                    }

                                    {

                                        project.live &&

                                        <a

                                            href={project.live}

                                            target="_blank"

                                            rel="noreferrer"

                                            className="text-green-600"

                                        >

                                            Live Demo

                                        </a>

                                    }

                                </div>

                            </div>

                        ))

                        :

                        <p className="text-slate-500">

                            Projects unavailable.

                        </p>

                    }

                </div>

            </div>


            {/* Certifications & Achievements */}

            <div className="grid lg:grid-cols-2 gap-8">

                <div className="bg-white rounded-2xl shadow-sm p-8">

                    <h2 className="text-2xl font-bold mb-6">

                        📜 Certifications

                    </h2>

                    <div className="space-y-3">

                        {

                            parsedResume?.certifications?.length > 0 ?

                            parsedResume.certifications.map((cert,index)=>(

                                <div

                                    key={index}

                                    className="bg-blue-50 border border-blue-200 rounded-xl p-4"

                                >

                                    {

                                        typeof cert === "string"

                                            ? cert

                                            : cert.name

                                    }

                                </div>

                            ))

                            :

                            <p className="text-slate-500">

                                No certifications found.

                            </p>

                        }

                    </div>

                </div>

                <div className="bg-white rounded-2xl shadow-sm p-8">

                    <h2 className="text-2xl font-bold mb-6">

                        🏆 Achievements

                    </h2>

                    <div className="space-y-3">

                        {

                            parsedResume?.achievements?.length > 0 ?

                            parsedResume.achievements.map((item,index)=>(

                                <div

                                    key={index}

                                    className="bg-green-50 border border-green-200 rounded-xl p-4"

                                >

                                    {item}

                                </div>

                            ))

                            :

                            <p className="text-slate-500">

                                No achievements available.

                            </p>

                        }

                    </div>

                </div>

            </div>


            {/* Languages & Professional Links */}

            <div className="grid lg:grid-cols-2 gap-8">

                <div className="bg-white rounded-2xl shadow-sm p-8">

                    <h2 className="text-2xl font-bold mb-6">

                        🌐 Languages

                    </h2>

                    <div className="flex flex-wrap gap-3">

                        {

                            parsedResume?.languages?.map((lang,index)=>(

                                <span

                                    key={index}

                                    className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full"

                                >

                                    {lang}

                                </span>

                            ))

                        }

                    </div>

                </div>

                <div className="bg-white rounded-2xl shadow-sm p-8">

                    <h2 className="text-2xl font-bold mb-6">

                        🔗 Professional Links

                    </h2>

                    <div className="space-y-3">

                        {

                            parsedResume?.github &&

                            <a

                                href={parsedResume.github}

                                target="_blank"

                                rel="noreferrer"

                                className="block text-blue-600"

                            >

                                GitHub

                            </a>

                        }

                        {

                            parsedResume?.linkedin &&

                            <a

                                href={parsedResume.linkedin}

                                target="_blank"

                                rel="noreferrer"

                                className="block text-blue-600"

                            >

                                LinkedIn

                            </a>

                        }

                        {

                            parsedResume?.portfolio &&

                            <a

                                href={parsedResume.portfolio}

                                target="_blank"

                                rel="noreferrer"

                                className="block text-blue-600"

                            >

                                Portfolio

                            </a>

                        }

                    </div>

                </div>

            </div>

                        {/* Positions of Responsibility */}

            {

                parsedResume?.positionsOfResponsibility?.length > 0 &&

                <div className="bg-white rounded-2xl shadow-sm p-8">

                    <h2 className="text-2xl font-bold mb-6">

                        👨‍💼 Positions of Responsibility

                    </h2>

                    <div className="space-y-4">

                        {

                            parsedResume.positionsOfResponsibility.map((item,index)=>(

                                <div

                                    key={index}

                                    className="border border-slate-200 rounded-xl p-5"

                                >

                                    <h3 className="font-semibold text-lg">

                                        {item.role}

                                    </h3>

                                    {

                                        item.organization &&

                                        <p className="text-blue-600 mt-1">

                                            {item.organization}

                                        </p>

                                    }

                                    {

                                        item.description &&

                                        <p className="mt-3 text-slate-700">

                                            {item.description}

                                        </p>

                                    }

                                </div>

                            ))

                        }

                    </div>

                </div>

            }


            {/* AI Analysis */}

            <div className="grid lg:grid-cols-2 gap-8">

                {/* Strengths */}

                <div className="bg-white rounded-2xl shadow-sm p-8">

                    <h2 className="text-2xl font-bold text-green-700 mb-6">

                        ✅ Strengths

                    </h2>

                    <div className="space-y-4">

                        {

                            review?.strengths?.length > 0 ?

                            review.strengths.map((item,index)=>(

                                <div

                                    key={index}

                                    className="bg-green-50 border border-green-200 rounded-xl p-4"

                                >

                                    {item}

                                </div>

                            ))

                            :

                            <p className="text-slate-500">

                                No strengths available.

                            </p>

                        }

                    </div>

                </div>


                {/* Weaknesses */}

                <div className="bg-white rounded-2xl shadow-sm p-8">

                    <h2 className="text-2xl font-bold text-red-700 mb-6">

                        ⚠️ Weaknesses

                    </h2>

                    <div className="space-y-4">

                        {

                            review?.weaknesses?.length > 0 ?

                            review.weaknesses.map((item,index)=>(

                                <div

                                    key={index}

                                    className="bg-red-50 border border-red-200 rounded-xl p-4"

                                >

                                    {item}

                                </div>

                            ))

                            :

                            <p className="text-slate-500">

                                No weaknesses detected.

                            </p>

                        }

                    </div>

                </div>

            </div>


            {/* AI Suggestions */}

            <div className="bg-white rounded-2xl shadow-sm p-8">

                <h2 className="text-2xl font-bold mb-6">

                    💡 AI Suggestions

                </h2>

                <div className="space-y-4">

                    {

                        review?.suggestions?.length > 0 ?

                        review.suggestions.map((item,index)=>(

                            <div

                                key={index}

                                className="bg-blue-50 border border-blue-200 rounded-xl p-4"

                            >

                                {item}

                            </div>

                        ))

                        :

                        <p className="text-slate-500">

                            No suggestions available.

                        </p>

                    }

                </div>

            </div>

        </div>

    );

};

export default ResumeReview;