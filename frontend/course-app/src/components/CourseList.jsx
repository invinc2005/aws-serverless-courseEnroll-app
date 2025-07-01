import { useEffect, useState } from "react";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    // 1. Fetch all courses
    fetch("https://wabcogw455.execute-api.eu-north-1.amazonaws.com/course")
      .then(res => res.json())
      .then(data => {
        setCourses(Array.isArray(data) ? data : [data]);
      });

    // 2. Fetch enrolled courseIds
    if (email) {
      fetch(`https://wabcogw455.execute-api.eu-north-1.amazonaws.com/my-courses/${email}`)
        .then(res => res.json())
        .then(data => {
          const ids = data.map(course => course.courseId);
          setEnrolledIds(ids);
        });
    }
  }, [email]);

  const handleEnroll = async (courseId) => {
    if (!email) {
      alert("Please login to enroll.");
      return;
    }

    const res = await fetch("https://wabcogw455.execute-api.eu-north-1.amazonaws.com/enroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, courseId }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Enrolled!");
      setEnrolledIds(prev => [...prev, courseId]); // update list
    } else {
      alert(data.message || "Enrollment failed");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Available Courses</h2>
      {courses.map(course => {
        const isEnrolled = enrolledIds.includes(course.courseId);
        return (
          <div key={course.courseId} className="border rounded p-4 shadow">
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <p>{course.description}</p>
            <p className="text-sm text-gray-600">Duration: {course.durationHours} hrs</p>
            <p className="text-sm text-gray-600">Instructor: {course.instructorName}</p>
            <button
              className={`mt-2 px-3 py-1 rounded ${
                isEnrolled ? "bg-green-600 text-white cursor-not-allowed" : "bg-blue-600 text-white"
              }`}
              disabled={isEnrolled}
              onClick={() => !isEnrolled && handleEnroll(course.courseId)}
            >
              {isEnrolled ? "Already Enrolled" : "Enroll"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
