import { useState } from "react";

function QuestionCard() { 
    const questions = [
        {
            question: "Whatt is 2 + 2?",
            options: [3, 4, 5, 6]
        },
        {
            question: "Whatt is 22 - 16?",
            options: [5, 6, 7, 8]
        }
    ]
    const [CurrentIndex, SetCurrentIndex] = useState(0);
    const [SelectedAnswer, SetSelectedAnswer] = useState(null);
    const currentQuestion = questions[CurrentIndex];


    function NextQuestion() {
        SetSelectedAnswer(null);
        SetCurrentIndex(CurrentIndex + 1);
    }

    return(
        <div>
            <p>{currentQuestion.question}</p>

            {currentQuestion.options.map((option) => (
                <button key={option} onClick={() => SetSelectedAnswer(option)}>{option}</button>
            ))}

            {SelectedAnswer && <p>You selected {SelectedAnswer}</p>}

            <br />
            {CurrentIndex < questions.length - 1 && (
                <button onClick={NextQuestion}>Next</button>
            )}
        </div>
    )
}

export default QuestionCard;
