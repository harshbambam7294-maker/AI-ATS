import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <h1 className="text-3xl font-bold text-blue-500">
          HireIQ
        </h1>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="rounded-lg px-5 py-2 transition hover:bg-slate-700"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-blue-600 px-5 py-2 transition hover:bg-blue-700"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;