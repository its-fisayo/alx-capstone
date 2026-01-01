import { useState } from "react";
import QuestionCard from "./components/QuestionCard";

function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  return(
    <div>
      <h1>{isQuizStarted === false ? "Quiz App" : ""}</h1>
      <QuestionCard 
        isQuizStarted={isQuizStarted}
        setIsQuizStarted={setIsQuizStarted}
      />
    </div>
  )
}

export default App;