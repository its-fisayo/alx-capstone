import React from "react";

function ProgressBar({progress, currentIndex, questions}) {
    return (
        <div>
            <h3><b>Question {currentIndex + 1} of {questions.length}</b></h3>
            <div className="w-2/3 h-3 bg-gray-300 rounded-full overfllow-hidden">
                <div className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%`}}></div>
            </div>
        </div>
    )
}

export default ProgressBar;