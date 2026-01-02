import { useState } from "react";
import QuestionCard from "./components/QuestionCard";

function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

  return(
    <div className="flex justify-center items-center w-screen">
      <div className="bg-gray-100 rounded-md p-5 mx-auto mt-10 w-9/10 sm:w-100 sm:p-10 md:w-150">
        <h1>{showHistory ? "" : !isQuizStarted ? "Quiz App" : ""}</h1><br />
        <QuestionCard 
          isQuizStarted={isQuizStarted}
          setIsQuizStarted={setIsQuizStarted}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
        />
      </div>
    </div>
  )
}

export default App;