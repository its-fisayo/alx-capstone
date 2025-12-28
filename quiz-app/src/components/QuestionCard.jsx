import { useState, useEffect, useRef } from "react";
import QuizStart from "./QuizStart";
import ScoreSummary from "./ScoreSummary";

function QuestionCard() { 
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
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [questionAmount, setQuestionAmount] = useState(5);
    const [selectedDifficulty, setSelectedDifficulty] = useState("");
    const difficulties = ["easy", "medium", "hard"];

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
            const res = await fetch(`https://opentdb.com/api.php?amount=${questionAmount}&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`);
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

    if(!isQuizStarted) {
        return (
            <QuizStart 
                categories={categories}
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
        <div>
            <p dangerouslySetInnerHTML={{ __html: currentQuestion.question}} ></p>

            {currentQuestion.options.map((option) => (
                <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    dangerouslySetInnerHTML={{ __html: option}}
                    disabled= {selectedAnswer !== null}
                    >
                </button>
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
                <button onClick={nextQuestion} disabled={!selectedAnswer}>Next</button>
            )}

            {currentIndex === questions.length - 1 && (
                <button onClick={nextQuestion} disabled={!selectedAnswer}>Finish</button>
            )}
        </div>
    )
}

export default QuestionCard;
