import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-primary">🚍 Bus Ticket System</h1>

      <div className="flex gap-4">
        {isAdmin ? (
          <>
            <Link to="/admin/dashboard" className="hover:text-primary">Dashboard</Link>
            <Link to="/admin/addbus" className="hover:text-primary">Add Bus</Link>
            <Link to="/admin/allbuses" className="hover:text-primary">All Buses</Link>
            <Link to="/admin/allbookings" className="hover:text-primary">All Bookings</Link>
          </>
        ) : (
          <>
            <Link to="/search" className="hover:text-primary">Search</Link>
            <Link to="/bookings" className="hover:text-primary">My Bookings</Link>
          </>
        )}

        {user ? (
          <button
            onClick={handleLogout}
            className="ml-4 bg-danger text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/"
            className="ml-4 bg-primary text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
