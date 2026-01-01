import React from "react"

function ScoreSummary({questions, restartQuiz, review, score}) {
    return (
        <div>
            <h2>Quiz Finished 🎉</h2>
            <p>Your score: {score} / {questions.length}</p>
            <h1>{`${(score / questions.length) * 100}`}%</h1>
            <button onClick={restartQuiz}>Restart Quiz</button>

            <h3>Review</h3>
            {review.map((item, index) => (
                <div key={index}>
                    <p><strong>Q{index + 1}:</strong>{" "}<span dangerouslySetInnerHTML={{__html: item.question}} /></p>
                    <p>
                        Your answer:{" "}
                        {item.isCorrect ?  (
                            <span>✔ {" "} <span dangerouslySetInnerHTML={{__html: item.selected}} /></span>
                        ) : (
                            <span>❌ {" "} <span dangerouslySetInnerHTML={{__html: item.selected}} /></span>
                        )}
                    </p>

                    {!item.isCorrect && (
                        <p>Correct answer: ✅{" "} <span dangerouslySetInnerHTML={{ __html: item.correct}} /></p>
                    )}
                    <hr />
                </div>
            ))}
        </div>
    )
}

export default ScoreSummary;