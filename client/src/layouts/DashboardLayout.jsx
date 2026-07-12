import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {

    return (

        <div className="flex bg-slate-100 min-h-screen">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <main className="pt-20 px-8">

                    <Outlet />

                </main>

            </div>

        </div>

    );

};

export default DashboardLayout;