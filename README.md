# Quiz App – React + Tailwind CSS

A modern, responsive Quiz Application built using React, React Router, and Tailwind CSS.

The app randomly selects questions, includes a countdown timer, tracks high scores using localStorage, and displays a detailed result summary.

## 🚀 Features

- ✅ Randomly selects 6 unique questions

- ⏳ 30-second timer per question

- 📊 Progress bar indicator

- 💾 High score stored using localStorage

- 🏆 Displays highest score achieved

- 📄 Detailed result summary (correct & incorrect answers)

- 🔁 Retry quiz option

- 🗑 Clear all stored scores

- 🎨 Fully responsive UI with Tailwind CSS

## 🛠 Tech Stack

- ⚛️ React (Hooks: useState, useEffect)

- 🌐 React Router DOM

- 🎨 Tailwind CSS

- 💾 Browser LocalStorage

## 📁 Project Structure
```
quiz-app/
│
├── src/
│   ├── components/
│   │   ├── QuestionCard.jsx
│   │   └── ResultSummary.jsx
│   │
│   ├── pages/
│   │   ├── QuizPage.jsx
│   │   └── ResultPage.jsx
│   │
│   ├── data/
│   │   └── questions.json
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
└── README.md
```
## 📦 Installation & Setup
1️⃣ Clone the repository

```javascript
 git clone https://github.com/Dharmndr/QuizApp.git
 cd quiz-app 
```
2️⃣ Install dependencies
```
npm install
```
3️⃣ Start development server
```
npm run dev
```
OR (if created using create-react-app):
```
npm start
```
App will run on:
```
http://localhost:3000
```
## 📚 How It Works
🔹 1. Question Selection

- Loads questions from questions.json

- Removes duplicates

- Randomly shuffles and selects 6 questions

🔹 2. Timer Logic

- Each question has a 30-second countdown

- If time runs out → automatically moves to next question

🔹 3. Answer Handling

- User selects one option

- "Next" button enabled only after selecting an answer (or timer ends)

🔹 4. Score Calculation
```javascript
const score = questions.reduce(
  (acc, q, index) => (answers[index] === q.answer ? acc + 1 : acc),
  0
);
```
🔹 5. High Score Storage
```javascript
localStorage.setItem("highScores", JSON.stringify([...prevScores, score]));
```
🔹 6. Results Page

Shows:

  - Final score

   - Highest score

   -  Correct & incorrect answers

Option to:

   - Retry quiz

 - Clear all stored scores

## 🎯 Sample Features Demonstrated

- React Hooks (useState, useEffect)

- Routing with React Router

- Conditional Rendering

- Array Methods (map, reduce, filter)

- LocalStorage usage

- Dynamic styling with Tailwind

## 🖥 UI Highlights

- Clean modern card design

- Smooth progress bar animation

- Color-coded results:

  🟢 Green → Correct

  🔴 Red → Incorrect

- Responsive layout

## 🧩 Future Improvements

- Add difficulty levels

- Add category selection

- Add leaderboard system

- Add authentication

- Add backend for storing scores

- Add sound effects


## 👨‍💻 Author

Dharmendra Kumar

## 📄 License

This project is open-source and available under the MIT License.
