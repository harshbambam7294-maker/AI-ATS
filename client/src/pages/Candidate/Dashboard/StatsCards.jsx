const StatsCards = ({ stats }) => {

    const cards = [

        {
            title: "Applications",
            value: stats.applications,
            color: "bg-blue-500"
        },

        {
            title: "Pending",
            value: stats.pending,
            color: "bg-yellow-500"
        },

        {
            title: "Accepted",
            value: stats.accepted,
            color: "bg-green-500"
        },

        {
            title: "Rejected",
            value: stats.rejected,
            color: "bg-red-500"
        }

    ];

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {

                cards.map(card => (

                    <div
                        key={card.title}
                        className="bg-white rounded-2xl shadow-sm p-6"
                    >

                        <div
                            className={`w-14 h-14 rounded-xl ${card.color}`}
                        />

                        <h3 className="text-xl font-semibold mt-5">

                            {card.title}

                        </h3>

                        <p className="text-5xl font-bold mt-3">

                            {card.value}

                        </p>

                    </div>

                ))

            }

        </div>

    );

};

export default StatsCards;