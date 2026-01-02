import React from "react";

function QuizStart({categories, selectedCategory, setSelectedCategory, questionAmount, setQuestionAmount, startQuiz, loading, error, difficulties, selectedDifficulty, setSelectedDifficulty, setShowHistory, quizTypes, selectedType, setSelectedType, searchItem, setSearchItem}) {
     return (
        <div className="w-full my-0">
            <div className="flex justify-between">
                <h2><b>Select a Topic</b></h2>
                <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchItem}
                    onChange={(e) => {setSearchItem(e.target.value)}}
                    className="w-40 p-2 border rounded-full mb-3 h-7"
                />
            </div>

            {searchItem && categories.length === 0 && (
                <p className="text-red-500">No categories match your search.</p>
            )}
            <select value={selectedCategory} onChange={(e) => {setSelectedCategory(e.target.value)}}>
                <option value="">-- Choose a category --</option>

                {categories.map((cat) => (
                    <option key= {cat.id} value= {cat.id}>{cat.name}</option>
                ))}
            </select>
            <br /><br />

            <h3><b>Enter the Number of Questions</b></h3>
            <input type="number" value={questionAmount} min={5} max={50} onChange={(e) => setQuestionAmount(Number(e.target.value))} className="rounded-md w-15"/>
            <br /><br />

            <h3><b>Select a Difficulty Level</b></h3>
            <select value={selectedDifficulty} onChange={(e) => {setSelectedDifficulty(e.target.value)}}>
                <option value="">-- Choose a difficulty level --</option>

                {difficulties.map((dif) => (
                    <option key={dif} value={dif}>{dif.charAt(0).toUpperCase() + dif.slice(1)}</option>
                ))}
            </select>
            <br /><br />

            <h3><b>Select Quiz Type</b></h3>
            <select value={selectedType} onChange={(e) => {setSelectedType(e.target.value)}}>
                <option value="">-- Choose a quiz type --</option>
                {quizTypes.map((typ) => (
                    <option key={typ} value={typ}>{typ}</option>
                ))}
            </select>
            <br /><br />

            <button onClick={startQuiz} disabled={!selectedCategory || !selectedDifficulty || !selectedType || questionAmount > 50 || questionAmount < 5 || loading}>Start Quiz</button>
            <button onClick={() => setShowHistory(true)}>View Quiz History</button>

            {loading && <p>Loading quiz...</p>}
            {error && <p>{error}</p>}
        </div>
    )
}
export default QuizStart;