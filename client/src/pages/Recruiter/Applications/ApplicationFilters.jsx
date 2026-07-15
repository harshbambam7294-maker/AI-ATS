const ApplicationFilters = ({ search, setSearch }) => {

    return (

        <div className="bg-white rounded-2xl shadow-sm p-6">

            <input
                type="text"
                placeholder="Search by candidate or job..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

        </div>

    );

};

export default ApplicationFilters;