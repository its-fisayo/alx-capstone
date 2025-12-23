import { useState } from "react";

function QuestionCard() {    
    const [SelectedAnswer, SetSelectedAnswer] = useState(null);
    return(
        <div>
            <p>What is 2 + 2?</p>
            <button onClick={() => SetSelectedAnswer("3")}>3</button>
            <button onClick={() => SetSelectedAnswer("4")}>4</button>
            <button onClick={() => SetSelectedAnswer("5")}>5</button>
            <button onClick={() => SetSelectedAnswer("6")}>6</button>

            {SelectedAnswer && <p>You selected {SelectedAnswer}</p>}
        </div>
    )
}

export default QuestionCard;