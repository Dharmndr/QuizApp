import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center">
        {/* Application Routes */}
        <Routes>
          <Route path="/" element={<QuizPage />} /> {/* Quiz Page */}
          <Route path="/results" element={<ResultPage />} /> {/* Results Page */}
        </Routes>
      </div>
    </Router>
  );
}
