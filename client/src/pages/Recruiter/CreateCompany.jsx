import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const CreateCompany = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        logo: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await api.post("/company", form);

            alert("Company Created Successfully");

            navigate("/recruiter/companies");

        } catch (error) {

            console.log(error);

            alert("Unable to create company");

        }

        setLoading(false);

    };

    return (

        <div className="max-w-3xl mx-auto">

            <div className="bg-white rounded-2xl shadow p-8">

                <h1 className="text-3xl font-bold mb-8">

                    Create Company

                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        name="name"
                        placeholder="Company Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                        required
                    />

                    <textarea
                        rows="5"
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                    />

                    <input
                        name="website"
                        placeholder="Website"
                        value={form.website}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                    />

                    <input
                        name="location"
                        placeholder="Location"
                        value={form.location}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                    />

                    <input
                        name="logo"
                        placeholder="Logo URL"
                        value={form.logo}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                    />

                    <button
                        disabled={loading}
                        className="bg-blue-600 text-white px-8 py-3 rounded-xl"
                    >
                        {loading ? "Creating..." : "Create Company"}
                    </button>

                </form>

            </div>

        </div>

    );

};

export default CreateCompany;