import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

const EditCompany = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        logo: ""
    });

    useEffect(() => {

        fetchCompany();

    }, []);

    const fetchCompany = async () => {

        try {

            const res = await api.get(`/company/${id}`);

            setForm(res.data.company);

        } catch (error) {

            console.log(error);

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

        try {

            await api.put(`/company/${id}`, form);

            alert("Company Updated");

            navigate("/recruiter/companies");

        } catch (error) {

            console.log(error);

        }

    };

    if (loading) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="max-w-3xl mx-auto">

            <div className="bg-white rounded-2xl shadow p-8">

                <h1 className="text-3xl font-bold mb-8">

                    Edit Company

                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                    />

                    <textarea
                        rows="5"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                    />

                    <input
                        name="website"
                        value={form.website}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                    />

                    <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                    />

                    <input
                        name="logo"
                        value={form.logo}
                        onChange={handleChange}
                        className="w-full border rounded-xl p-3"
                    />

                    <button
                        className="bg-blue-600 text-white px-8 py-3 rounded-xl"
                    >
                        Update Company
                    </button>

                </form>

            </div>

        </div>

    );

};

export default EditCompany;