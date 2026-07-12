import { Link } from "react-router-dom";

const ProfileCard = ({ profile }) => {

    return (

        <div className="bg-white rounded-2xl shadow-sm p-8">

            <div className="flex flex-col items-center">

                <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">

                    {profile?.name?.charAt(0)}

                </div>

                <h2 className="text-2xl font-bold mt-5">

                    {profile?.name}

                </h2>

                <p className="text-slate-500">

                    {profile?.email}

                </p>

            </div>

            <div className="border-t mt-8 pt-6 space-y-4">

                <div className="flex justify-between">

                    <span className="text-slate-500">

                        Resume

                    </span>

                    <span>

                        {

                            profile?.resume ?

                                "Uploaded ✅"

                                :

                                "Not Uploaded"

                        }

                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-slate-500">

                        Role

                    </span>

                    <span className="capitalize">

                        {profile?.role}

                    </span>

                </div>

            </div>

            <Link

                to="/candidate/profile"

                className="block mt-8 bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl"

            >

                View Profile

            </Link>

        </div>

    );

};

export default ProfileCard;