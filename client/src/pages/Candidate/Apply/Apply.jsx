import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";

const Apply = () => {

    const { jobId } = useParams();

    const navigate = useNavigate();

    const [job, setJob] = useState(null);

    const [loading, setLoading] = useState(true);

    const [submitting, setSubmitting] = useState(false);

    const [form, setForm] = useState({

        coverLetter: "",

        resume: ""

    });

    useEffect(() => {

        fetchJob();

    }, []);

    const fetchJob = async () => {

        try {

            const res = await api.get(`/jobs/public/${jobId}`);

            setJob(res.data.job);

        }

        catch (err) {

            console.log(err);

        }

        setLoading(false);

    };

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setSubmitting(true);

        try {

            await api.post(

                `/applications/apply/${jobId}`,

                form

            );

            alert("Application submitted successfully.");

            navigate("/candidate/applications");

        }

        catch (err) {

            console.log(err);

            alert(

                err.response?.data?.message ||

                "Unable to submit application."

            );

        }

        setSubmitting(false);

    };

    if (loading) {

        return (

            <div className="flex justify-center items-center h-[70vh]">

                Loading...

            </div>

        );

    }

    return (

        <div className="max-w-4xl mx-auto space-y-8">

            <div className="bg-white rounded-2xl shadow-sm p-8">

                <h1 className="text-4xl font-bold">

                    Apply for Job

                </h1>

                <p className="text-slate-500 mt-2">

                    Complete your application below.

                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-8">

                <h2 className="text-2xl font-bold">

                    {job.title}

                </h2>

                <p className="text-slate-500 mt-2">

                    {job.company.name}

                </p>

                <div className="flex gap-3 mt-5 flex-wrap">

                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">

                        {job.location}

                    </span>

                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">

                        {job.employmentType}

                    </span>

                    <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full">

                        ₹{job.salary}
                    </span>

                </div>

            </div>

            <form

                onSubmit={handleSubmit}

                className="bg-white rounded-2xl shadow-sm p-8 space-y-6"

            >

                <div>

                    <label className="block font-semibold mb-2">

                        Cover Letter

                    </label>

                    <textarea

                        rows="10"

                        name="coverLetter"

                        value={form.coverLetter}

                        onChange={handleChange}

                        placeholder="Tell the recruiter why you're the best candidate..."

                        className="w-full border rounded-xl p-4"

                        required

                    />

                </div>

                <div>

                    <label className="block font-semibold mb-2">

                        Resume URL (Optional)

                    </label>

                    <input

                        type="text"

                        name="resume"

                        value={form.resume}

                        onChange={handleChange}

                        placeholder="Leave empty to use your uploaded resume"

                        className="w-full border rounded-xl p-4"

                    />

                </div>

                <div className="flex gap-5">

                    <button

                        disabled={submitting}

                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl"

                    >

                        {

                            submitting ?

                                "Submitting..."

                                :

                                "Submit Application"

                        }

                    </button>

                    <button

                        type="button"

                        onClick={() => navigate(-1)}

                        className="border px-8 py-4 rounded-xl"

                    >

                        Cancel

                    </button>

                </div>

            </form>

        </div>

    );

};

export default Apply;