import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import gif from "../assets/pFpp_5.gif";
import Navbar from "./Navbar";

const Quiz = () => {
  const [question, setQuestion] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [attemptedQuestions, setAttemptedQuestions] = useState(0);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("http://backend.topishukla.xyz/checkAuth", {
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

  const parseQuestion = (questionText) => {
    const questionParts = questionText.split("?");
    const questionOnly = questionParts[0] + "?";
    const optionsText = questionParts[1];
    
    const options = optionsText
      .split(/[A-D]\)/)
      .filter(opt => opt.trim())
      .map(opt => opt.trim());

    return {
      questionText: questionOnly,
      options: options
    };
  };

  const fetchQuestion = async () => {
    try {
      const response = await axios.get("http://backend.topishukla.xyz/question", {
        withCredentials: true,
      });
      setQuestion(response.data.question);
    } catch (error) {
      console.error(error);
      setMessage("Failed to fetch the question. Please try again.");
    }
  };

  const handleOptionSelect = (optionIndex) => {
    const optionLetter = String.fromCharCode(65 + optionIndex);
    setSelectedOption(optionLetter);
  };

  const submitAnswer = async () => {
    if (!selectedOption) {
      setMessage("Please select an option!");
      return;
    }
    try {
      const response = await axios.post(
        "http://backend.topishukla.xyz/answer",
        { answer: selectedOption },
        { withCredentials: true }
      );
      
      setMessage(response.data.message);
      
      if (response.data.message === "You've completed the game!") {
        setScore(response.data.score);
        setIsQuizCompleted(true);
        setMessage(`You've completed the game! Your score is ${response.data.score}.`);
        return;
      }

      // Handle regular answer response
      if (response.data.message === "Correct answer!") {  // Check the exact message your backend sends
        setScore(prevScore => prevScore + 1);
        setMessage("Correct answer!");
      } else {
        setMessage("Wrong answer!");
      }

      // Move to next question after a delay
      setTimeout(() => {
        setCurrentQuestionNumber(prev => prev + 1);
        setSelectedOption("");
        setMessage("");
        fetchQuestion();
      }, 1000);

    } catch (error) {
      console.error(error);
      setMessage("Failed to submit the answer. Please try again.");
    }
  };
  
  const currentQuestionData = question ? parseQuestion(question) : { questionText: "", options: [] };

  const redirectToStartQuiz = () => {
    setIsQuizCompleted(false);
    navigate("/startQuiz");
  };

  return (
    <div
      className="flex flex-col lg:flex-row h-screen bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${gif})`,
      }}
    >
      <Navbar />
      <div className="w-full lg:w-1/5 bg-black/50 backdrop-blur-md text-gray-200 p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold mb-3 mt-24">Quiz Progress</h1>
          <p className="text-sm">Question {currentQuestionNumber}</p>
          <p className="text-sm mt-2">Current Score: {score}</p>
        </div>
        <footer className="text-xs text-center mt-4">
          © 2024 Quiz Platform
        </footer>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-xl p-6 rounded-lg shadow-lg bg-white/10 backdrop-blur-md border border-white/20">
          <h1 className="text-2xl font-bold text-center mb-4 text-white">Quiz Game</h1>
          
          {message && (
            <p className="text-center text-base font-medium mb-3 text-white">
              {message}
            </p>
          )}

          {!isQuizCompleted ? (
            <div>
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg mb-4 border border-white/10">
                <p className="text-lg font-semibold text-white">
                  {currentQuestionData.questionText}
                </p>
              </div>
              <div className="space-y-2">
                {currentQuestionData.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className={`w-full p-3 text-left rounded-lg transition-all duration-200 border backdrop-blur-sm text-sm ${
                      selectedOption === String.fromCharCode(65 + index)
                        ? "bg-blue-600/80 text-white border-blue-400"
                        : "bg-white/5 hover:bg-white/10 text-gray-200 border-white/10"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}) {option}
                  </button>
                ))}
              </div>
              <button
                onClick={submitAnswer}
                className="w-full mt-4 bg-blue-600/80 hover:bg-blue-700/80 backdrop-blur-sm text-white font-bold py-3 rounded-lg transition-all duration-200 border border-blue-400 text-sm"
              >
                Submit Answer
              </button>
            </div>
          ) : (
            <div className="text-center bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
              <p className="text-lg font-semibold mb-3 text-white">
                Quiz Completed!
              </p>
              <p className="text-base mb-4 text-white">
                Your score: {score}
              </p>
              <button
                onClick={redirectToStartQuiz}
                className="w-full bg-green-600/80 hover:bg-green-700/80 backdrop-blur-sm text-white font-bold py-3 rounded-lg transition-all duration-200 border border-green-400 text-sm"
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