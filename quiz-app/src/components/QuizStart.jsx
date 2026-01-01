import React from "react";

function QuizStart({categories, selectedCategory, setSelectedCategory, questionAmount, setQuestionAmount, startQuiz, loading, error, difficulties, selectedDifficulty, setSelectedDifficulty, setShowHistory}) {
     return (
        <div>
            <h2>Select a Topic</h2>

            <select value={selectedCategory} onChange={(e) => {setSelectedCategory(e.target.value)}}>
                <option value="">-- Choose a category --</option>

                {categories.map((cat) => (
                    <option key= {cat.id} value= {cat.id}>{cat.name}</option>
                ))}
            </select>
            <br /><br />

            <h3>Enter the Number of Questions</h3>
            <input type="number" value={questionAmount} min={5} max={50} onChange={(e) => setQuestionAmount(Number(e.target.value))}/>
            <br /><br />

            <h3>Enter a Difficulty Level</h3>
            <select value={selectedDifficulty} onChange={(e) => {setSelectedDifficulty(e.target.value)}}>
                <option value="">-- Choose a difficulty level --</option>

                {difficulties.map((dif) => (
                    <option key={dif} value={dif}>{dif.charAt(0).toUpperCase() + dif.slice(1)}</option>
                ))}
            </select>
            <br /><br />

            <button onClick={startQuiz} disabled={!selectedCategory || !selectedDifficulty || loading}>Start Quiz</button>
            <button onClick={() => setShowHistory(true)}>View Quiz History</button>

            {loading && <p>Loading quiz...</p>}
            {error && <p>{error}</p>}
        </div>
    )
}
export default QuizStart;