import { useEffect, useState } from "react";

export default function MyCourses() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email) {
      alert("Please login to view your courses.");
      return;
    }

    fetch(`https://wabcogw455.execute-api.eu-north-1.amazonaws.com/my-courses/${email}`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched enrolled courses:", data); 
        setEnrolledCourses(Array.isArray(data) ? data : [data]);
      })
      .catch(() => alert("Error fetching enrolled courses"));
  }, [email]);

  const handleUnenroll = async (courseId) => {
    const confirm = window.confirm("Are you sure you want to unenroll?");
    if (!confirm) return;

    try {
      const res = await fetch(`https://wabcogw455.execute-api.eu-north-1.amazonaws.com/enroll?email=${email}&courseId=${courseId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Unenrolled successfully");
        setEnrolledCourses(prev => prev.filter(course => course.courseId !== courseId));
      } else {
        alert("Failed to unenroll");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during unenrollment.");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Enrolled Courses</h2>
      {enrolledCourses.length === 0 ? (
        <p>You haven’t enrolled in any courses yet.</p>
      ) : (
        enrolledCourses.map(course => (
          <div key={course.courseId} className="border rounded p-4 mb-4 shadow">
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <p>{course.description}</p>
            <p className="text-sm text-gray-600">Duration: {course.durationHours} hrs</p>
            <p className="text-sm text-gray-600">Instructor: {course.instructorName}</p>
            <button
              onClick={() => handleUnenroll(course.courseId)}
              className="mt-3 bg-red-600 text-white px-4 py-2 rounded"
            >
              Unenroll
            </button>
          </div>
        ))
      )}
    </div>
  );
}
