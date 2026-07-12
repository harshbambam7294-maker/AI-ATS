const JobFilters = ({ search, setSearch }) => {

    return (

        <div className="bg-white rounded-2xl shadow-sm p-5">

            <input

                value={search}

                onChange={(e) => setSearch(e.target.value)}

                placeholder="Search Jobs..."

                className="w-full border rounded-xl p-3"

            />

        </div>

    );

};

export default JobFilters;