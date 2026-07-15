import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../services/api";

const Profile = () => {

    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const [user, setUser] = useState(null);

    const [resumeFile, setResumeFile] = useState(null);

    const fileInputRef = useRef(null);

    useEffect(() => {

        fetchProfile();

    }, []);

    const fetchProfile = async () => {

        try {

            const res = await api.get("/users/profile");

            setUser(res.data.user);

        }

        catch (err) {

            console.log(err);

        }

        setLoading(false);

    };

    const uploadResume = async () => {

        if (!resumeFile) {

            alert("Please select a PDF resume.");

            return;

        }

        const formData = new FormData();

        formData.append("resume", resumeFile);

        try {

            setUploading(true);

            const res = await api.post(

                "/users/upload-resume",

                formData,

                {

                    headers: {

                        "Content-Type": "multipart/form-data"

                    }

                }

            );

            alert(res.data.message);

            fetchProfile();

            setResumeFile(null);

            fileInputRef.current.value = "";

        }

        catch (err) {

            console.log(err);

            alert(

                err.response?.data?.message ||

                "Resume upload failed."

            );

        }

        setUploading(false);

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

            {/* Personal Information */}

            <div className="bg-white rounded-2xl shadow-sm p-8">

                <h2 className="text-2xl font-bold mb-6">

                    Personal Information

                </h2>

                <div className="grid md:grid-cols-2 gap-8">

                    <div>

                        <p className="text-slate-500">

                            Full Name

                        </p>

                        <h3 className="font-semibold text-lg">

                            {user?.name}

                        </h3>

                    </div>

                    <div>

                        <p className="text-slate-500">

                            Email

                        </p>

                        <h3 className="font-semibold text-lg">

                            {user?.email}

                        </h3>

                    </div>

                    <div>

                        <p className="text-slate-500">

                            Role

                        </p>

                        <h3 className="font-semibold text-lg capitalize">

                            {user?.role}

                        </h3>

                    </div>

                    <div>

                        <p className="text-slate-500">

                            Resume Status

                        </p>

                        <h3 className="font-semibold text-lg">

                            {

                                user?.resume

                                    ? "✅ Uploaded"

                                    : "❌ Not Uploaded"

                            }

                        </h3>

                    </div>

                </div>

            </div>

            {/* Resume */}

            <div className="bg-white rounded-2xl shadow-sm p-8">

                <h2 className="text-2xl font-bold mb-6">

                    Resume

                </h2>

                {

                    user?.resume ?

                    <a

                        href={user.resume}

                        target="_blank"

                        rel="noreferrer"

                        className="text-blue-600 underline font-medium"

                    >

                        View Uploaded Resume

                    </a>

                    :

                    <p className="text-slate-500">

                        No resume uploaded.

                    </p>

                }

                <div className="mt-8">

                    <input

                        ref={fileInputRef}

                        type="file"

                        accept=".pdf"

                        onChange={(e)=>setResumeFile(e.target.files[0])}

                    />

                    <button

                        onClick={uploadResume}

                        disabled={uploading}

                        className="block mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"

                    >

                        {

                            uploading

                                ? "Uploading..."

                                : "Upload Resume"

                        }

                    </button>

                </div>

            </div>

            {/* Quick Actions */}

            <div className="bg-white rounded-2xl shadow-sm p-8">

                <h2 className="text-2xl font-bold mb-6">

                    Quick Actions

                </h2>

                <div className="grid md:grid-cols-3 gap-6">

                    <Link

                        to="/candidate/resume-review"

                        className="bg-purple-600 text-white rounded-xl p-6 text-center hover:bg-purple-700"

                    >

                        🤖

                        <br /><br />

                        AI Resume Review

                    </Link>

                    <Link

                        to="/candidate/jobs"

                        className="bg-blue-600 text-white rounded-xl p-6 text-center hover:bg-blue-700"

                    >

                        💼

                        <br /><br />

                        Browse Jobs

                    </Link>

                    <Link

                        to="/candidate/applications"

                        className="bg-green-600 text-white rounded-xl p-6 text-center hover:bg-green-700"

                    >

                        📄

                        <br /><br />

                        My Applications

                    </Link>

                </div>

            </div>

        </div>

    );

};

export default Profile;