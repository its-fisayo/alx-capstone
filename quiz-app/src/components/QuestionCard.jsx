import { useState } from "react";

function QuestionCard() { 
    const questions = [
        {
            question: "Whatt is 2 + 2?",
            options: ["3", "4", "5", "6"],
            correctAnswer: "4"
        },
        {
            question: "Whatt is 22 - 16?",
            options: ["5", "6", "7", "8"],
            correctAnswer: "6"
        }
    ]
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const currentQuestion = questions[currentIndex];
    const [score, setScore] = useState(0);
    const [isFinished, setFinished] = useState(false);


    function nextQuestion() {
        setSelectedAnswer(null);

        if(currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setFinished(true);
        }
    }

    function handleAnswer(option) {
        setSelectedAnswer(option);

        if(option === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }
    }

    function restartQuiz() {
        setCurrentIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setFinished(false);
    }

    if(isFinished) {
        return (
            <div>
                <h2>Quiz Finished 🎉</h2>
                <p>Your score: {score} / {questions.length}</p>
                <button onClick={restartQuiz}>Restart Quiz</button>
            </div>
        )
    }
    return(
        <div>
            <p>{currentQuestion.question}</p>

            {currentQuestion.options.map((option) => (
                <button key={option} onClick={() => handleAnswer(option)}>{option}</button>
            ))}

            {selectedAnswer && (
                <p>
                    {selectedAnswer === currentQuestion.correctAnswer
                    ? "Correct ✅"
                    : "Wrong ❌"}
                </p>
            )}

            <br />
            {currentIndex < questions.length - 1 && (
                <button onClick={nextQuestion}>Next</button>
            )}

            {currentIndex === questions.length - 1 && (
                <button onClick={nextQuestion}>Finish</button>
            )}
        </div>
    )
}

export default QuestionCard;
