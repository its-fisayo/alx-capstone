React Quiz App
A modern, responsive quiz application built with React, Tailwind CSS, and the Open Trivia Database API. Users can select quiz topics, difficulty levels, quiz types, and track their scores. The app also includes search, history tracking, social sharing, and optional dark mode support.

Features
Dynamic Quiz Generation: Fetches questions from Open Trivia Database
 with support for:
    Categories (e.g., Science, Sports)
    Difficulty levels (Easy, Medium, Hard)
    Quiz types (Multiple Choice, True/False)
Searchable Categories: Users can search for quiz topics in real-time.
Progress Tracking: Shows current question number and a progress bar.
Score Summary: Displays correct and incorrect answers at the end.
Quiz History: Stores quiz attempts in localStorage so users can review past results.
Answer Review: Users can see which answers they got correct or wrong.
Responsive Design: Fully responsive using Tailwind CSS.
Dark Mode (optional): Improves usability in low-light conditions.

Getting Started

Prerequisites
    Node.js v18+
    npm or yarn

Installation
# Clone the repository
git clone https://github.com/yourusername/react-quiz-app.git
cd react-quiz-app

# Install dependencies
npm install
# or
yarn install

Running the App
# Start the development server
npm run dev
# or
yarn dev


Open http://localhost:5173
 to view the app in your browser.

Project Structure
src/
 ├─ components/
 │   ├─ QuestionCard.jsx      # Main quiz logic
 │   ├─ QuizStart.jsx         # Quiz selection & search
 │   ├─ ScoreSummary.jsx      # Quiz results
 │   ├─ ProgressBar.jsx       # Progress bar for quiz
 │   └─ QuizHistory.jsx       # Review past quizzes
 ├─ App.jsx                   # Main app entry
 ├─ main.jsx                  # ReactDOM render
 └─ index.css                 # Tailwind CSS imports & global styles

Usage

Select a quiz category, number of questions, difficulty, and type.
Search for topics using the search bar if desired.
Answer each question; correct/incorrect feedback is shown immediately.
Track your progress using the progress bar.
After finishing, view your score summary, review answers, and share your results.
Check your quiz history for past attempts.

Acknowledgements

Open Trivia Database
    for the quiz API
React
Tailwind CSS