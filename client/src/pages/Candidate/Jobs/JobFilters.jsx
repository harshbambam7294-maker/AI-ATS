const JobFilters = ({
    search,
    setSearch,
    location,
    setLocation,
    employmentType,
    setEmploymentType
}) => {

    return (

        <div className="bg-white rounded-2xl shadow-sm p-6">

            <div className="grid md:grid-cols-3 gap-5">

                <input

                    type="text"

                    placeholder="Search jobs or companies..."

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                    className="border rounded-xl p-3"

                />

                <input

                    type="text"

                    placeholder="Location"

                    value={location}

                    onChange={(e) => setLocation(e.target.value)}

                    className="border rounded-xl p-3"

                />

                <select

                    value={employmentType}

                    onChange={(e) => setEmploymentType(e.target.value)}

                    className="border rounded-xl p-3"

                >

                    <option value="">

                        All Employment Types

                    </option>

                    <option>

                        Internship

                    </option>

                    <option>

                        Full-time

                    </option>

                    <option>

                        Part-time

                    </option>

                    <option>

                        Contract

                    </option>

                    <option>

                        Remote

                    </option>

                </select>

            </div>

        </div>

    );

};

export default JobFilters;