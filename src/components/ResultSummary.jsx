// Component to show summary of answers after completing the quiz
export default function ResultSummary({ questions, answers }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Results Summary</h2>
      <ul className="space-y-4">
        {questions.map((q, index) => {
          const correct = answers[index] === q.answer; // Check if answer is correct
          return (
            <li
              key={q.id}
              className={`p-3 rounded-lg ${
                correct ? "bg-green-100" : "bg-red-100" // Green if correct, red if wrong
              }`}
            >
              <p className="font-medium">{q.question}</p>
              <p className="text-sm">
                Your Answer:{" "}
                <span className="font-semibold">{answers[index]}</span>
              </p>

              {/* Show correct answer if the user's answer is wrong */}
              {!correct && (
                <p className="text-sm text-green-700">
                  Correct Answer:{" "}
                  <span className="font-semibold">{q.answer}</span>
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
