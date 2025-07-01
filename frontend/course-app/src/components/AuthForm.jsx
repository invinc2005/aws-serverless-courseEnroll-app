import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ setLoggedIn }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    const endpoint = isAdminLogin
      ? "https://wabcogw455.execute-api.eu-north-1.amazonaws.com/admin-login"
      : isSignup
      ? "https://wabcogw455.execute-api.eu-north-1.amazonaws.com/signup"
      : "https://wabcogw455.execute-api.eu-north-1.amazonaws.com/login";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      if (isAdminLogin) {
        localStorage.setItem("adminEmail", email);
        navigate("/admin-dashboard");
      } else {
        localStorage.setItem("email", email);
        setLoggedIn(true);
        navigate("/courses");
      }
    } else {
      alert(data.message || "Authentication failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isAdminLogin
            ? "Admin Login"
            : isSignup
            ? "Sign Up"
            : "Login"}
        </h2>

        {!isAdminLogin && (
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-sm text-blue-600 hover:underline mb-4 block mx-auto"
          >
            Switch to {isSignup ? "Login" : "Sign Up"}
          </button>
        )}

        <label className="block mb-4 text-center">
          <input
            type="checkbox"
            checked={isAdminLogin}
            onChange={(e) => {
              setIsAdminLogin(e.target.checked);
              setIsSignup(false); 
            }}
          />
          <span className="ml-2">Login as Admin</span>
        </label>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300"
          >
            {isAdminLogin
              ? "Admin Login"
              : isSignup
              ? "Create Account"
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
