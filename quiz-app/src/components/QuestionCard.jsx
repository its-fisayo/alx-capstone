import { useState, useEffect, useRef } from "react";

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
            const res = await fetch(`https://opentdb.com/api.php?amount=${questionAmount}&category=${selectedCategory}&type=multiple`);
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
            <div>
                <h2>Select a Topic</h2>

                <select value={selectedCategory} onChange={(e) => {setSelectedCategory(e.target.value)}}>
                    <option value="">-- Choose a category --</option>

                    {categories.map((cat) => (
                        <option key= {cat.id} value= {cat.id}>{cat.name}</option>
                    ))}
                </select>
                <br /><br />

                <h3>Enter the Number of Questions</h3>
                <input type="number" value={questionAmount} min={5} max={50} onChange={(e) => setQuestionAmount(Number(e.target.value))}/>
                    <br /><br />

                <button onClick={startQuiz} disabled={!selectedCategory}>Start Quiz</button>

                {loading && <p>Loading quiz...</p>}
                {error && <p>{error}</p>}
            </div>
        )
    }

    if(loading) return <p>Loading quiz...</p>;
    if(error) return <p>{error}</p>

    if(isFinished) {
        return (
            <div>
                <h2>Quiz Finished 🎉</h2>
                <p>Your score: {score} / {questions.length}</p>
                <button onClick={restartQuiz}>Restart Quiz</button>

                <h3>Review</h3>
                {review.map((item, index) => (
                    <div key={index}>
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
