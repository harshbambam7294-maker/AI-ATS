import { companies } from "../../data/companies";

function FeaturedCompanies() {
    return (
        <section className="bg-slate-100 py-16">
            <div className="mx-auto max-w-6xl px-6">
                <h2 className="mb-10 text-center text-4xl font-bold text-slate-800">Featured Companies</h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {
                        companies.map((company)=>{
                            const Icon = company.icon;

                            return (
                                <div
                                    key={company.id}
                                    className="rounded-xl bg-white p-6 shadow-md transition hover:shadow-xl"
                                    >
                                        <Icon className="text-5xl text-blue-600"/>

                                        <h3 className="mt-4 text-xl font-semibold text-slate-800">
                                            {
                                                company.name
                                            }
                                        </h3>

                                        <p className="mt-4 text-xl font-semibold text-slate-800">
                                            {
                                                company.location
                                            }
                                        </p>
                                    </div>
                            );
                        })
                    }
                </div>
            </div>
        </section>
    );
}

export default FeaturedCompanies;