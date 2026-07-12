import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const Companies = () => {

    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {

        try {

            const res = await api.get("/company");

            setCompanies(res.data.companies);

        } catch (error) {

            console.log(error);

        }

        setLoading(false);

    };

    const deleteCompany = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this company?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/company/${id}`);

            setCompanies(prev =>
                prev.filter(company => company._id !== id)
            );

        } catch (error) {

            console.log(error);

            alert("Unable to delete company");

        }

    };

    if (loading) {

        return (
            <div className="flex justify-center items-center h-[70vh]">
                Loading...
            </div>
        );

    }

    return (

        <div className="space-y-8">

            <div className="flex justify-between items-center">

                <div>

                    <h1 className="text-4xl font-bold">

                        Companies

                    </h1>

                    <p className="text-slate-500 mt-2">

                        Manage your companies

                    </p>

                </div>

                <Link

                    to="/recruiter/companies/create"

                    className="bg-blue-600 text-white px-5 py-3 rounded-xl"

                >

                    + Add Company

                </Link>

            </div>

            {

                companies.length === 0 ?

                    <div className="bg-white rounded-2xl shadow p-12 text-center">

                        <h2 className="text-2xl font-semibold">

                            No Companies Found

                        </h2>

                        <p className="text-slate-500 mt-2">

                            Create your first company.

                        </p>

                    </div>

                    :

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

                        {

                            companies.map(company => (

                                <div

                                    key={company._id}

                                    className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6"

                                >

                                    {

                                        company.logo ?

                                            <img

                                                src={company.logo}

                                                alt={company.name}

                                                className="h-16 w-16 rounded-xl object-cover mb-5"

                                            />

                                            :

                                            <div className="h-16 w-16 rounded-xl bg-slate-200 mb-5"/>

                                    }

                                    <h2 className="text-2xl font-bold">

                                        {company.name}

                                    </h2>

                                    <p className="text-slate-500 mt-2">

                                        {

                                            company.description ||

                                            "No description."

                                        }

                                    </p>

                                    <div className="mt-5 space-y-2">

                                        <p>

                                            📍 {company.location || "N/A"}

                                        </p>

                                        {

                                            company.website &&

                                            <a

                                                href={company.website}

                                                target="_blank"

                                                rel="noreferrer"

                                                className="text-blue-600"

                                            >

                                                Visit Website

                                            </a>

                                        }

                                    </div>

                                    <div className="flex gap-3 mt-6">

                                        <Link

                                            to={`/recruiter/companies/edit/${company._id}`}

                                            className="flex-1 bg-yellow-500 text-white text-center py-2 rounded-lg"

                                        >

                                            Edit

                                        </Link>

                                        <button

                                            onClick={() =>
                                                deleteCompany(company._id)
                                            }

                                            className="flex-1 bg-red-500 text-white py-2 rounded-lg"

                                        >

                                            Delete

                                        </button>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

            }

        </div>

    );

};

export default Companies;