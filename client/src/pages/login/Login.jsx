import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [form, setForm] = useState({

        email: "",

        password: "",

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

            const data = await login(

                form.email,

                form.password

            );

            if (data.user.role === "recruiter")

                navigate("/recruiter/dashboard");

            else

                navigate("/candidate/dashboard");

        } catch {

            alert("Login Failed");

        }

    };

    return (

        <div className="max-w-md mx-auto py-20">

            <form

                onSubmit={handleSubmit}

                className="bg-white rounded-xl shadow p-8"

            >

                <h2 className="text-3xl font-bold mb-6">

                    Login

                </h2>

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

                <button

                    className="bg-blue-600 w-full py-3 rounded text-white"

                >

                    Login

                </button>

                <p className="mt-4">

                    Don't have an account?

                    <Link

                        to="/register"

                        className="text-blue-600 ml-2"

                    >

                        Register

                    </Link>

                </p>

            </form>

        </div>

    );

};

export default Login;