import React from "react";

function QuizHistory({ history, restartQuiz}) {
    if(history.length === 0) {
        return (
            <div>
                <h2>No quiz history yet</h2>
                <button onClick={restartQuiz}>Back</button>
            </div>
        );
    }

    return (
        <div>
            <h2>Quiz History</h2>

            {history.map((item, index) => (
                <div key={index}>
                    <p>{item.date}</p>
                    <p>Score: {item.score} / {item.total}</p>
                    <p>Category: {item.category || "Any"}</p>
                    <p>Difficulty: {item.difficulty}</p>
                    <hr />
                </div>
            ))}

            <button onClick={restartQuiz}>Back</button>
        </div>
    );
}

export default QuizHistory;