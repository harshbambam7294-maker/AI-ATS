import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {

    const { register } = useAuth();

    const navigate = useNavigate();

    const [form, setForm] = useState({

        name: "",

        email: "",

        password: "",

        role: "candidate",

    });

    const handleChange = e => {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async e => {

        e.preventDefault();

        try {

            await register(form);

            navigate("/login");

        } catch {

            alert("Registration Failed");

        }

    };

    return (

        <div className="max-w-md mx-auto py-20">

            <form

                onSubmit={handleSubmit}

                className="bg-white rounded-xl shadow p-8"

            >

                <h2 className="text-3xl font-bold mb-6">

                    Register

                </h2>

                <input

                    className="border w-full p-3 mb-4 rounded"

                    name="name"

                    placeholder="Name"

                    onChange={handleChange}

                />

                <input

                    className="border w-full p-3 mb-4 rounded"

                    name="email"

                    placeholder="Email"

                    onChange={handleChange}

                />

                <input

                    className="border w-full p-3 mb-4 rounded"

                    name="password"

                    type="password"

                    placeholder="Password"

                    onChange={handleChange}

                />

                <select

                    className="border w-full p-3 mb-4 rounded"

                    name="role"

                    onChange={handleChange}

                >

                    <option value="candidate">

                        Candidate

                    </option>

                    <option value="recruiter">

                        Recruiter

                    </option>

                </select>

                <button

                    className="bg-blue-600 text-white py-3 w-full rounded"

                >

                    Register

                </button>

                <p className="mt-4">

                    Already have an account?

                    <Link

                        to="/login"

                        className="text-blue-600 ml-2"

                    >

                        Login

                    </Link>

                </p>

            </form>

        </div>

    );

};

export default Register;