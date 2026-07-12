import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="bg-slate-50 min-h-screen">

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 py-24">

                <div className="grid md:grid-cols-2 gap-12 items-center">

                    <div>

                        <h1 className="text-5xl font-extrabold leading-tight text-slate-900">

                            Hire Smarter with{" "}

                            <span className="text-blue-600">

                                AI Powered Recruitment

                            </span>

                        </h1>

                        <p className="mt-6 text-lg text-slate-600 leading-8">

                            HireIQ helps recruiters identify the best
                            candidates using AI Resume Parsing,
                            ATS Scoring, Candidate Matching,
                            Resume Reviews and Interview Question
                            Generation.

                        </p>

                        <div className="mt-10 flex gap-4">

                            <Link
                                to="/register"
                                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                            >
                                Get Started
                            </Link>

                            <Link
                                to="/login"
                                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
                            >
                                Login
                            </Link>

                        </div>

                    </div>

                    <div>

                        <div className="bg-white rounded-3xl shadow-xl p-10">

                            <h2 className="text-2xl font-bold text-slate-800">

                                Why HireIQ?

                            </h2>

                            <div className="mt-6 space-y-5">

                                <div>
                                    ✅ AI Resume Parsing
                                </div>

                                <div>
                                    ✅ ATS Score Analysis
                                </div>

                                <div>
                                    ✅ Smart Candidate Matching
                                </div>

                                <div>
                                    ✅ Resume Improvement Suggestions
                                </div>

                                <div>
                                    ✅ AI Interview Questions
                                </div>

                                <div>
                                    ✅ Recruiter Dashboard
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* Stats Section */}

            <section className="bg-white py-16">

                <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">

                    <div>

                        <h2 className="text-4xl font-bold text-blue-600">
                            AI
                        </h2>

                        <p className="text-slate-600 mt-2">
                            Resume Parsing
                        </p>

                    </div>

                    <div>

                        <h2 className="text-4xl font-bold text-blue-600">
                            ATS
                        </h2>

                        <p className="text-slate-600 mt-2">
                            Resume Scoring
                        </p>

                    </div>

                    <div>

                        <h2 className="text-4xl font-bold text-blue-600">
                            Smart
                        </h2>

                        <p className="text-slate-600 mt-2">
                            Candidate Matching
                        </p>

                    </div>

                    <div>

                        <h2 className="text-4xl font-bold text-blue-600">
                            AI
                        </h2>

                        <p className="text-slate-600 mt-2">
                            Interview Generator
                        </p>

                    </div>

                </div>

            </section>

        </div>
    );
};

export default Home;