import { useEffect, useState } from "react";
import api from "../../../services/api";

const Profile = () => {

    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState(null);

    const [resumeAI, setResumeAI] = useState(null);

    useEffect(() => {

        fetchProfile();

    }, []);

    const fetchProfile = async () => {

        try {

            const res = await api.get("/profile");

            setUser(res.data.user);

            setResumeAI(res.data.resumeAI);

        }

        catch (err) {

            console.log(err);

        }

        setLoading(false);

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-[70vh]">

                Loading Profile...

            </div>

        );

    }

    return (

        <div className="space-y-8">

            {/* Header */}

            <div className="bg-white rounded-2xl shadow-sm p-8">

                <div className="flex items-center gap-6">

                    <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-5xl font-bold">

                        {user?.name?.charAt(0)}

                    </div>

                    <div>

                        <h1 className="text-4xl font-bold">

                            {user?.name}

                        </h1>

                        <p className="text-slate-500 mt-2">

                            {user?.email}

                        </p>

                        <span className="inline-block mt-4 bg-blue-100 text-blue-700 px-4 py-2 rounded-full capitalize">

                            {user?.role}

                        </span>

                    </div>

                </div>

            </div>

            {/* Personal Info */}

            <div className="bg-white rounded-2xl shadow-sm p-8">

                <h2 className="text-2xl font-bold mb-6">

                    Personal Information

                </h2>

                <div className="grid md:grid-cols-2 gap-6">

                    <div>

                        <p className="text-slate-500">

                            Full Name

                        </p>

                        <h3 className="text-lg font-semibold">

                            {user?.name}

                        </h3>

                    </div>

                    <div>

                        <p className="text-slate-500">

                            Email

                        </p>

                        <h3 className="text-lg font-semibold">

                            {user?.email}

                        </h3>

                    </div>

                    <div>

                        <p className="text-slate-500">

                            Role

                        </p>

                        <h3 className="text-lg font-semibold capitalize">

                            {user?.role}

                        </h3>

                    </div>

                    <div>

                        <p className="text-slate-500">

                            Resume

                        </p>

                        {

                            user?.resume ?

                            <a

                                href={user.resume}

                                target="_blank"

                                rel="noreferrer"

                                className="text-blue-600 underline"

                            >

                                View Uploaded Resume

                            </a>

                            :

                            <span className="text-red-600">

                                No Resume Uploaded

                            </span>

                        }

                    </div>

                </div>

            </div>

            {/* AI Resume Summary */}

            <div className="bg-white rounded-2xl shadow-sm p-8">

                <h2 className="text-2xl font-bold mb-8">

                    AI Resume Summary

                </h2>

                {

                    !resumeAI ?

                    (

                        <div className="text-center py-10 text-slate-500">

                            Upload your resume to generate AI insights.

                        </div>

                    )

                    :

                    (

                        <div className="space-y-8">

                            <div>

                                <h3 className="font-semibold text-lg mb-3">

                                    Professional Summary

                                </h3>

                                <p className="text-slate-700 leading-8">

                                    {resumeAI.parsedResume?.summary || "Not Available"}

                                </p>

                            </div>

                            <div>

                                <h3 className="font-semibold text-lg mb-3">

                                    Skills

                                </h3>

                                <div className="flex flex-wrap gap-3">

                                    {

                                        resumeAI.parsedResume?.skills?.map((skill, index) => (

                                            <span

                                                key={index}

                                                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"

                                            >

                                                {skill}

                                            </span>

                                        ))

                                    }

                                </div>

                            </div>

                            <div>

                                <h3 className="font-semibold text-lg mb-3">

                                    Education

                                </h3>

                                <ul className="space-y-3">

                                    {

                                        resumeAI.parsedResume?.education?.map((edu, index) => (

                                            <li

                                                key={index}

                                                className="border rounded-xl p-4"

                                            >

                                                {typeof edu === "string"

                                                    ? edu
                                                    : JSON.stringify(edu)}

                                            </li>

                                        ))

                                    }

                                </ul>

                            </div>

                            <div>

                                <h3 className="font-semibold text-lg mb-3">

                                    Experience

                                </h3>

                                <ul className="space-y-3">

                                    {

                                        resumeAI.parsedResume?.experience?.map((exp, index) => (

                                            <li

                                                key={index}

                                                className="border rounded-xl p-4"

                                            >

                                                {typeof exp === "string"

                                                    ? exp
                                                    : JSON.stringify(exp)}

                                            </li>

                                        ))

                                    }

                                </ul>

                            </div>

                            <div>

                                <h3 className="font-semibold text-lg mb-3">

                                    Projects

                                </h3>

                                <ul className="space-y-3">

                                    {

                                        resumeAI.parsedResume?.projects?.map((project, index) => (

                                            <li

                                                key={index}

                                                className="border rounded-xl p-4"

                                            >

                                                {typeof project === "string"

                                                    ? project
                                                    : JSON.stringify(project)}

                                            </li>

                                        ))

                                    }

                                </ul>

                            </div>

                        </div>

                    )

                }

            </div>

            {/* Actions */}

            <div className="bg-white rounded-2xl shadow-sm p-8">

                <h2 className="text-2xl font-bold mb-6">

                    Quick Actions

                </h2>

                <div className="flex flex-wrap gap-5">

                    <a

                        href="/candidate/jobs"

                        className="bg-blue-600 text-white px-6 py-3 rounded-xl"

                    >

                        Browse Jobs

                    </a>

                    <a

                        href="/candidate/applications"

                        className="bg-green-600 text-white px-6 py-3 rounded-xl"

                    >

                        My Applications

                    </a>

                    <a

                        href="/candidate/resume-review"

                        className="bg-purple-600 text-white px-6 py-3 rounded-xl"

                    >

                        AI Resume Review

                    </a>

                </div>

            </div>

        </div>

    );

};

export default Profile;