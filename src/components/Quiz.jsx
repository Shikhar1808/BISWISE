import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import gif from "../assets/pFpp_5.gif";
import Navbar from "./Navbar";

const Quiz = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("http://localhost:8000/checkAuth", {
          withCredentials: true,
        });
        if (!response.data.authenticated) navigate("/login");
        else fetchQuestion();
      } catch (error) {
        console.error("Authentication check failed", error);
        navigate("/login");
      }
    };

    checkAuthentication();
  }, [navigate]);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get("http://localhost:8000/question", {
        withCredentials: true,
      });
      setQuestion(response.data.question);
    } catch (error) {
      console.error(error);
      setMessage("Failed to fetch the question. Please try again.");
    }
  };

  const submitAnswer = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/answer",
        { answer },
        { withCredentials: true }
      );
      setMessage(response.data.message);
      if (response.data.message !== "You've completed the game!") {
        fetchQuestion();
      } else {
        setMessage(
          `You've completed the game! Your score is ${response.data.score}.`
        );
        setIsQuizCompleted(true);
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to submit the answer. Please try again.");
    }
  };

  const redirectToStartQuiz = () => {
    setIsQuizCompleted(false);
    navigate("/startQuiz");
  };

  return (
    <div
      className="flex flex-col lg:flex-row min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${gif})`,
      }}
    >
      <Navbar />
      <div className="w-full lg:w-1/4 bg-black/50 backdrop-blur-md text-gray-200 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-4 mt-48">Sidebar</h1>
          <p className="text-sm">
            Use this area for additional information or navigation links.
          </p>
        </div>
        <footer className="text-sm text-center mt-6">
          © 2024 Quiz Platform
        </footer>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-2xl p-8 rounded-lg shadow-lg glassmorphism">
          <h1 className="text-3xl font-bold text-center mb-6">Quiz</h1>
          <p className="text-center text-lg font-medium mb-4">{message}</p>
          {!isQuizCompleted && (
            <div>
              <p className="text-xl font-semibold mb-4">
        Question:{" "}
        <span
          className="font-normal"
          dangerouslySetInnerHTML={{ __html: question }} // Rendering HTML content here
        />
      </p>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer..."
                className="w-full p-3 mb-6 border-2 rounded-lg bg-white/10 backdrop-blur-sm placeholder-gray-400 text-gray-200 border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <button
                onClick={submitAnswer}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all duration-200"
              >
                Submit Answer
              </button>
            </div>
          )}
          {isQuizCompleted && (
            <div className="text-center">
              <p className="text-xl font-semibold mb-6">
                {`You've completed the game!`}
              </p>
              <button
                onClick={redirectToStartQuiz}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-all duration-200"
              >
                Restart Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;