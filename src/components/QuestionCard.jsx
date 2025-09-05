// Component to display a single question and its answer options
export default function QuestionCard({
  question,
  options,
  currentAnswer,
  onAnswerSelect,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg">
      {/* Display question */}
      <h2 className="text-xl font-semibold mb-4">{question}</h2>

      {/* Display all answer options */}
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(option)} // Save selected answer
            className={`w-full px-4 py-2 rounded-lg text-left border ${
              currentAnswer === option
                ? "bg-blue-600 text-white border-blue-600" // Highlight selected answer
                : "bg-gray-100 hover:bg-gray-200" // Default style
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
