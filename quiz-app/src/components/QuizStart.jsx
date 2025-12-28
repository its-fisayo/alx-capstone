import React from "react";

function QuizStart({categories, selectedCategory, setSelectedCategory, questionAmount, setQuestionAmount, startQuiz, loading, error}) {
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

            <button onClick={startQuiz} disabled={!selectedCategory}>Start Quiz</button>

            {loading && <p>Loading quiz...</p>}
            {error && <p>{error}</p>}
        </div>
    )
}
export default QuizStart;