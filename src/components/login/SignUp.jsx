import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const setData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // if (password !== confirmPassword) {
    //   setError("Passwords do not match");
    //   return;
    // }

    const formData = {
      lName: name,
      lMail: email,
      lPassword: password,
    }

    console.log(formData);

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/signup", formData, {
        withCredentials: true,
      });
        console.log("hello");
      if (response.data.err) {
        setError(response.data.err);
      } else if (response.data.redirect) {
        navigate("/login");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-white text-black flex-col pt-20 pb-10">
        <div className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Enter your Name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-lg font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
              onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Enter your password"
              />
            </div>
            {/* <div className="mb-6">
              <label htmlFor="confirm{assword" className="block text-lg font-semibold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Confirm your password"
              />
            </div> */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="mr-2"
                />
                <label htmlFor="remember" className="text-sm">Remember me</label>
              </div>
            </div>
            <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
          </form>
          <p className="text-center text-sm mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
