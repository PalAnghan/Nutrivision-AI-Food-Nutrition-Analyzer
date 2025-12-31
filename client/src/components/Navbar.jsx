import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-green-600 flex items-center gap-2">
        🍏 NutriVision
      </h1>

      {/* Links */}
      <div className="flex gap-6 text-lg font-medium">
        <Link
          to="/"
          className="text-gray-700 hover:text-green-600 transition"
        >
          Home
        </Link>
        <Link
          to="/history"
          className="text-gray-700 hover:text-green-600 transition"
        >
          History
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
