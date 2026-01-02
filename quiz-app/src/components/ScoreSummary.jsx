import React from "react"

function ScoreSummary({questions, restartQuiz, review, score}) {
    return (
        <div className="">
            <h1>Quiz Finished</h1>
            <p>Your score: {score} / {questions.length}</p>
            <h1>{`${Math.round((score / questions.length) * 100)}`}%</h1>
            <button onClick={restartQuiz} className="button-shadow">Restart Quiz</button>
            <br /><br />

            <h2 className="text-2xl pb-5"><b>Review</b></h2>
            {review.map((item, index) => (
                <div key={index} className="pb-5">
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