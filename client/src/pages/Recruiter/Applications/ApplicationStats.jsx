const ApplicationStats = ({ applications }) => {

    const total = applications.length;

    const pending = applications.filter(
        app => app.status === "pending"
    ).length;

    const accepted = applications.filter(
        app => app.status === "accepted"
    ).length;

    const rejected = applications.filter(
        app => app.status === "rejected"
    ).length;

    const cards = [

        {
            title: "Total",
            value: total,
            color: "bg-blue-500"
        },

        {
            title: "Pending",
            value: pending,
            color: "bg-yellow-500"
        },

        {
            title: "Accepted",
            value: accepted,
            color: "bg-green-500"
        },

        {
            title: "Rejected",
            value: rejected,
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
                            className={`w-12 h-12 rounded-xl ${card.color}`}
                        />

                        <h2 className="text-lg font-semibold mt-4">

                            {card.title}

                        </h2>

                        <p className="text-4xl font-bold mt-2">

                            {card.value}

                        </p>

                    </div>

                ))

            }

        </div>

    );

};

export default ApplicationStats;