import { useLocation, useNavigate } from "react-router-dom";
import ResultSummary from "../components/ResultSummary";
import { useState } from "react";

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  // Redirect to home if results are missing
  if (!state || !state.questions || !state.answers) {
    navigate("/");
    return null;
  }

  const { questions, answers } = state;

  // Calculate final score
  const score = questions.reduce(
    (acc, q, index) => (answers[index] === q.answer ? acc + 1 : acc),
    0
  );

  // Get best score from localStorage
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  const bestScore = Math.max(...highScores, 0);

  // ✅ Clear stored scores + show confirmation message
  const handleClearScores = () => {
    localStorage.removeItem("highScores");
    setMessage("✅ Your all scores cleared successfully!");
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
    setTimeout(() => setMessage(""), 3000); // Hide after 3 seconds
  };

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Quiz Completed 🎉</h1>
      <p className="text-xl font-medium">
        You scored {score} / {questions.length}
      </p>
      <p className="text-lg text-green-700">
        🏆 Highest Score: <span className="font-semibold">{bestScore}</span>
      </p>

      {/* Success Message */}
      {message && (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-md text-center w-full max-w-md">
          {message}
        </div>
      )}

      {/* Show results summary */}
      <ResultSummary questions={questions} answers={answers} />

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry Quiz
        </button>
        <button
          onClick={handleClearScores}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Clear Scores
        </button>
      </div>
    </div>
  );
}
