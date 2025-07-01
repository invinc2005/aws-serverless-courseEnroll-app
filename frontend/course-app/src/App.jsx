import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthForm from "./components/AuthForm";
import CoursePage from "./pages/Courses";
import MyCoursesPage from "./pages/MyCourses";
import Navbar from "./components/Navbar";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email");
    setLoggedIn(!!email);
  }, []);

  return (
    <Router>
      {loggedIn && <Navbar setLoggedIn={setLoggedIn} />}
      <Routes>
        <Route path="/" element={!loggedIn ? <AuthForm setLoggedIn={setLoggedIn} /> : <Navigate to="/courses" />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/courses" element={loggedIn ? <CoursePage /> : <Navigate to="/" />} />
        <Route path="/mycourses" element={loggedIn ? <MyCoursesPage /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
