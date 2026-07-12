import { useEffect, useState } from "react";
import api from "../../../services/api";

const JobModal = ({ job, onClose }) => {

    const [companies, setCompanies] = useState([]);

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({

        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        experience: "",
        employmentType: "Full-time",
        companyId: ""

    });

    useEffect(() => {

        fetchCompanies();

        if (job) {

            setForm({

                title: job.title || "",

                description: job.description || "",

                requirements: job.requirements
                    ? job.requirements.join(", ")
                    : "",

                salary: job.salary || "",

                location: job.location || "",

                experience: job.experience || "",

                employmentType: job.employmentType || "Full-time",

                companyId: job.company?._id || ""

            });

        }

    }, []);

    const fetchCompanies = async () => {

        try {

            const res = await api.get("/company");

            setCompanies(res.data.companies);

        } catch (err) {

            console.log(err);

        }

    };

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        const payload = {

            ...form,

            salary: Number(form.salary),

            experience: Number(form.experience),

            requirements: form.requirements
                .split(",")
                .map(skill => skill.trim())
                .filter(Boolean)

        };

        try {

            if (job) {

                await api.put(`/jobs/${job._id}`, payload);

            }

            else {

                await api.post("/jobs", payload);

            }

            onClose();

        } catch (err) {

            console.log(err);

            alert("Unable to save job");

        }

        setLoading(false);

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

            <div className="bg-white rounded-2xl w-full max-w-3xl p-8 max-h-[90vh] overflow-y-auto">

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-3xl font-bold">

                        {

                            job

                                ? "Edit Job"

                                : "Create Job"

                        }

                    </h2>

                    <button

                        onClick={onClose}

                        className="text-2xl"

                    >

                        ✕

                    </button>

                </div>

                <form

                    onSubmit={handleSubmit}

                    className="space-y-5"

                >

                    <input

                        name="title"

                        value={form.title}

                        onChange={handleChange}

                        placeholder="Job Title"

                        className="w-full border rounded-xl p-3"

                        required

                    />

                    <textarea

                        rows="5"

                        name="description"

                        value={form.description}

                        onChange={handleChange}

                        placeholder="Job Description"

                        className="w-full border rounded-xl p-3"

                        required

                    />

                    <textarea

                        rows="3"

                        name="requirements"

                        value={form.requirements}

                        onChange={handleChange}

                        placeholder="Node.js, MongoDB, Express"

                        className="w-full border rounded-xl p-3"

                    />

                    <div className="grid md:grid-cols-2 gap-4">

                        <input

                            type="number"

                            name="salary"

                            value={form.salary}

                            onChange={handleChange}

                            placeholder="Salary"

                            className="border rounded-xl p-3"

                        />

                        <input

                            type="number"

                            name="experience"

                            value={form.experience}

                            onChange={handleChange}

                            placeholder="Experience"

                            className="border rounded-xl p-3"

                        />

                    </div>

                    <div className="grid md:grid-cols-2 gap-4">

                        <input

                            name="location"

                            value={form.location}

                            onChange={handleChange}

                            placeholder="Location"

                            className="border rounded-xl p-3"

                        />

                        <select

                            name="employmentType"

                            value={form.employmentType}

                            onChange={handleChange}

                            className="border rounded-xl p-3"

                        >

                            <option>

                                Full-time

                            </option>

                            <option>

                                Part-time

                            </option>

                            <option>

                                Internship

                            </option>

                            <option>

                                Contract

                            </option>

                        </select>

                    </div>

                    <select

                        name="companyId"

                        value={form.companyId}

                        onChange={handleChange}

                        className="w-full border rounded-xl p-3"

                        required

                    >

                        <option value="">

                            Select Company

                        </option>

                        {

                            companies.map(company => (

                                <option

                                    key={company._id}

                                    value={company._id}

                                >

                                    {company.name}

                                </option>

                            ))

                        }

                    </select>

                    <div className="flex justify-end gap-4">

                        <button

                            type="button"

                            onClick={onClose}

                            className="px-6 py-3 border rounded-xl"

                        >

                            Cancel

                        </button>

                        <button

                            disabled={loading}

                            className="bg-blue-600 text-white px-8 py-3 rounded-xl"

                        >

                            {

                                loading

                                    ? "Saving..."

                                    : "Save Job"

                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default JobModal;