import React from "react";

function QuizHistory({ history, restartQuiz}) {
    if(history.length === 0) {
        return (
            <div>
                <h2>No quiz history yet</h2>
                <button onClick={restartQuiz} className="button-shadow">Back</button>
            </div>
        );
    }

    return (
        <div className="w-full sm:">
            <h1>Quiz History</h1>
            <br /><br />
            {history.map((item, index) => (
                <div key={index} className="pb-5">
                    <p>{item.date}</p>
                    <p>Score: {item.score} / {item.total}</p>
                    <p>Category: {item.category || "Any"}</p>
                    <p>Difficulty: {item.difficulty}</p>
                    <p>Type: {item.type}</p>
                    <hr />
                </div>
            ))}

            <button onClick={restartQuiz}  className="button-shadow">Back</button>
        </div>
    );
}

export default QuizHistory;