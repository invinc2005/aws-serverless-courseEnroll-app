import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("email");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="space-x-6">
        <Link to="/courses" className="text-blue-600 font-semibold hover:underline">
          Courses
        </Link>
        <Link to="/mycourses" className="text-blue-600 font-semibold hover:underline">
          My Courses
        </Link>
      </div>
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition duration-300"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
