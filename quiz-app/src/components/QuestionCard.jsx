import { useState, useEffect, useRef } from "react";
import QuizStart from "./QuizStart";
import ScoreSummary from "./ScoreSummary";
import ProgressBar from "./ProgressBar";
import QuizHistory from "./QuizHistory";

function QuestionCard({ isQuizStarted, setIsQuizStarted, showHistory, setShowHistory}) { 
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] =useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const currentQuestion = questions[currentIndex];
    const [score, setScore] = useState(0);
    const [isFinished, setFinished] = useState(false);
    const hasFetched = useRef(false);
    const [review, setReview] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [questionAmount, setQuestionAmount] = useState(5);
    const [selectedDifficulty, setSelectedDifficulty] = useState("");
    const difficulties = ["easy", "medium", "hard"];
    const progress = ((currentIndex + 1) / questions.length) * 100
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem("quiz-history");
        return saved ? JSON.parse(saved) : [];
    });
    const quizTypes = ["Multiple Choice", "True/False"];
    const [selectedType, setSelectedType] = useState("");
    const chosenType = selectedType === "Multiple Choice" ? "multiple" : selectedType === "True/False" ? "boolean" : "";
    const [searchItem, setSearchItem] = useState("");
    const filteredCategories = categories.filter(cat => 
        cat?.name?.toLowerCase().includes(searchItem.toLowerCase())
    )



    useEffect(() => {
        if(hasFetched.current) return;
        hasFetched.current = true;

        async function fetchCategories() {
            try {
                const res = await fetch("https://opentdb.com/api_category.php");
                const data = await res.json();
                setCategories(data.trivia_categories);
            } catch (err) {
                setError("Failed to load categories")
            }
        }
        fetchCategories();
    }, []);

    async function startQuiz() {
        setLoading(true);

        try {
            const res = await fetch(`https://opentdb.com/api.php?amount=${questionAmount}&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=${chosenType}`);
            const data = await res.json();

            const formatted = data.results.map((q) => {
                const options = [...q.incorrect_answers, q.correct_answer];
                options.sort(() => Math.random() - 0.5);

                return {
                    question: q.question,
                    options: options,
                    correctAnswer: q.correct_answer
                };
            });

            setQuestions(formatted);
            setIsQuizStarted(true);
            setLoading(false);
        } catch(err) {
            setError("Failed to load quiz questions");
            setLoading(false);
        }
    }

    function nextQuestion() {
        setSelectedAnswer(null);

        if(currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            const categoryName = categories.find(c => c.id == selectedCategory)?.name || "Any";

            const quizResult = {
                date: new Date().toLocaleString(),
                score: score + (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0),
                total: questions.length,
                category: categoryName,
                difficulty: selectedDifficulty,
                type: selectedType
            };

            const updateHistory = [...history, quizResult];

            setHistory(updateHistory);
            localStorage.setItem("quiz-history", JSON.stringify(updateHistory));

            setFinished(true);
        }
    }

    function handleAnswer(option) {
        setSelectedAnswer(option);

        const isCorrect = (option === currentQuestion.correctAnswer);
        if(isCorrect) {
            setScore(score + 1);
        }

        setReview((prev) => [
            ...prev,
            {
                question: currentQuestion.question,
                selected: option,
                correct: currentQuestion.correctAnswer,
                isCorrect: isCorrect
            }
        ]);
    }

    function restartQuiz() {
        setCurrentIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setFinished(false);
        setReview([]);
        setIsQuizStarted(false);
        setQuestions([]);
    }

    if(showHistory) {
        return (
            <QuizHistory 
                history={history}
                restartQuiz={() => setShowHistory(false)}
            />
        )
    }
    if(!isQuizStarted) {
        return (
            <QuizStart 
                categories={filteredCategories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                questionAmount={questionAmount}
                setQuestionAmount={setQuestionAmount}
                startQuiz={startQuiz}
                loading={loading}
                error={error}
                difficulties={difficulties}
                selectedDifficulty={selectedDifficulty}
                setSelectedDifficulty={setSelectedDifficulty}
                setShowHistory={setShowHistory}
                quizTypes={quizTypes}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                searchItem={searchItem}
                setSearchItem={setSearchItem}
            />
        )
    }

    if(loading) return <p>Loading quiz...</p>;
    if(error) return <p>{error}</p>

    if(isFinished) {
        return (
            <ScoreSummary
                questions={questions}
                restartQuiz={restartQuiz}
                review={review}
                score={score}
            />
        )
    }
    return(
        <div className="w-full h-100 flex flex-col justify-between">
            <div>
            <ProgressBar 
                progress={progress}
                currentIndex={currentIndex}
                questions={questions}
            />
            </div>

            <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col">
                    <div className="h-20">
            <p dangerouslySetInnerHTML={{ __html: currentQuestion.question}} ></p>
                    </div>

            {currentQuestion.options.map((option) => (
                <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    dangerouslySetInnerHTML={{ __html: option}}
                    disabled= {selectedAnswer !== null}
                    style={selectedAnswer === option ? (selectedAnswer === currentQuestion.correctAnswer ? {backgroundColor: "rgba(100, 255, 100, 0.5)", textAlign:"left", color:"black"} : {backgroundColor: "rgba(255, 100, 100, 0.5)", textAlign:"left", color:"black"}): {backgroundColor: "white", textAlign:"left"}}
                    >
                </button>
            ))}
            </div>

            <div>
            {currentIndex < questions.length - 1 && (
                <button onClick={nextQuestion} disabled={!selectedAnswer}>Next</button>
            )}

            {currentIndex === questions.length - 1 && (
                <button onClick={nextQuestion} disabled={!selectedAnswer}>Finish</button>
            )}
            </div>
            </div>
        </div>
    )
}

export default QuestionCard;
