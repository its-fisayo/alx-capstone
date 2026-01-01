import React from "react";

function ProgressBar({progress, currentIndex, questions}) {
    return (
        <div>
            <h4>Question {currentIndex + 1} of {questions.length}</h4>
        </div>
    )
}

export default ProgressBar;