import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import allQuestions from "../data/questions.json";

export default function QuizPage() {
  // States
  const [questions, setQuestions] = useState([]); // Stores 6 random questions
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks current question index
  const [answers, setAnswers] = useState({}); // Stores selected answers
  const [timeLeft, setTimeLeft] = useState(30); // Timer for each question
  const navigate = useNavigate();

  // ✅ Remove duplicate questions based on text to ensure unique questions only
  const getUniqueQuestions = (data) => {
    const seen = new Set();
    return data.filter((q) => {
      if (seen.has(q.question)) return false;
      seen.add(q.question);
      return true;
    });
  };

  // ✅ Randomly shuffle and pick 6 unique questions
  const selectRandomQuestions = (data, count) => {
    const uniqueData = getUniqueQuestions(data);
    const shuffled = [...uniqueData].sort(() => Math.random() - 0.5); // Shuffle array
    return shuffled.slice(0, count); // Pick first `count` questions
  };

  // ✅ Load 6 random unique questions when component mounts
  useEffect(() => {
    if (allQuestions && allQuestions.length > 0) {
      const selected = selectRandomQuestions(allQuestions, 6);
      setQuestions(selected);
    }
  }, []);

  // ✅ Countdown timer for each question
  useEffect(() => {
    if (questions.length === 0) return;
    if (timeLeft === 0) {
      handleNext();
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, currentIndex, questions]);

  // ✅ Save selected answer
  const handleAnswerSelect = (option) => {
    setAnswers({ ...answers, [currentIndex]: option });
  };

  // ✅ Navigate to next question or finish quiz
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      // Go to next question
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(30); // Reset timer
    } else {
      // If quiz finished → calculate score
      const score = questions.reduce(
        (acc, q, index) => (answers[index] === q.answer ? acc + 1 : acc),
        0
      );

      // Save score in localStorage
      const prevScores = JSON.parse(localStorage.getItem("highScores")) || [];
      localStorage.setItem("highScores", JSON.stringify([...prevScores, score]));

      // Navigate to results page
      navigate("/results", { state: { questions, answers } });
    }
  };

  // Show loading until questions are ready
  if (questions.length === 0) return <p>Loading questions...</p>;

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Quiz App</h1>

      {/* Progress Bar */}
      <div className="w-full max-w-lg h-3 bg-gray-300 rounded-full mb-4">
        <div
          className="h-3 bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Timer */}
      <div className="text-lg font-semibold text-gray-700 mb-4">
        ⏳ Time Left: <span className="text-blue-600">{timeLeft}s</span>
      </div>

      {/* Question Card */}
      <QuestionCard
        question={questions[currentIndex].question}
        options={questions[currentIndex].options}
        currentAnswer={answers[currentIndex]}
        onAnswerSelect={handleAnswerSelect}
      />

      {/* Footer Section */}
      <div className="flex justify-between mt-6 w-full max-w-lg">
        <span className="text-gray-600">
          Question {currentIndex + 1} of {questions.length}
        </span>
        <button
          onClick={handleNext}
          disabled={!answers[currentIndex] && timeLeft > 0}
          className={`px-5 py-2 rounded-lg font-medium ${
            answers[currentIndex] || timeLeft === 0
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
        >
          {currentIndex === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
