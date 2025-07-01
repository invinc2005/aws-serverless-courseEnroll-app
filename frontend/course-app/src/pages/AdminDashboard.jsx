import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const navigate = useNavigate();

  const adminEmail = localStorage.getItem("adminEmail");

  useEffect(() => {
    if (!adminEmail) {
      alert("Unauthorized access");
      navigate("/");
      return;
    }

    // Fetch all courses
    fetch("https://wabcogw455.execute-api.eu-north-1.amazonaws.com/course")
      .then(res => res.json())
      .then(data => setCourses(Array.isArray(data) ? data : [data]));

    // Fetch all enrollments
    fetch("https://wabcogw455.execute-api.eu-north-1.amazonaws.com/enrollments")
      .then(res => res.json())
      .then(setEnrollments);
  }, [adminEmail]);

  const logout = () => {
    localStorage.removeItem("adminEmail");
    navigate("/");
  };

  // Count enrollments per courseId
  const getEnrollmentCount = (courseId) =>
    enrollments.filter((e) => e.courseId === courseId).length;

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
        <button
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          onClick={logout}
        >
          Logout
        </button>
      </nav>

      {/* Course List */}
      <div className="p-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Courses and Enrollments</h2>
        {courses.map((course) => (
          <div key={course.courseId} className="border rounded p-4 mb-4 shadow">
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <p className="text-sm text-gray-600 mb-1">
              Instructor: {course.instructorName}
            </p>
            <p className="text-sm text-gray-600">
              Enrolled Students:{" "}
              <span className="font-bold">{getEnrollmentCount(course.courseId)}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
