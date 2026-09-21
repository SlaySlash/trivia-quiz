import React from "react"
import Header from "./components/header";

export default function App() {
    const [question, setQuestion] = React.useState([])
    const [currentQuestion, setCurrentQuestion] = React.useState(0)
    const [isFinished, setIsFinished] = React.useState(false)
    const current = question[currentQuestion]
    const isLastQuestion = currentQuestion === question.length - 1
    const correctQuizAnswers = question.filter(a => 
        a.selectedAnswer === a.correctAnswer).length


    function decode(text){
        const el = document.createElement("textarea")
        el.innerHTML = text
        return el.value
    }
    function getQuestion(){
        const url = import.meta.env.VITE_QUIZ_URL;
        fetch(url)
        .then(res => res.json())
        .then(data => {
            const mapQuestion = data.results.map((q, index) => 
                ({question: decode(q.question),
                  id: index,
                  category: decode(q.category),
                  answers: [...q.incorrect_answers, q.correct_answer].map(decode).sort(() => Math.random() - 0.5),
                  selectedAnswer: null, 
                  correctAnswer: decode(q.correct_answer)
                }))
            setQuestion(mapQuestion)
        })
    }
    React.useEffect(() =>{
        getQuestion()
    }
    , [])
    
            
    function toggleAnswer(id, answer){
        setQuestion(prev => prev.map(q => q.id === id ? ({...q, selectedAnswer: answer}) : q))
    }
    if (isFinished){
        const finishedQuestion = question.map(p =>(
            <div 
                key={p.id} 
                className={`result-item ${p.selectedAnswer === p.correctAnswer ? "correct" : "wrong"}`}
            >
                <h2>Question number {p.id + 1}</h2>
                <p>{p.question}</p>
                <p>Correct answer: {p.correctAnswer}</p>
                <p>You selected: {p.selectedAnswer}</p>
            </div>
        ))

        return( 
            <div className="quiz-results">
                <p className="quiz-points">CONGRATULATIONS!!!!!!!! YOU GOT {correctQuizAnswers}/{question.length}</p>
                {finishedQuestion}
                <button onClick={newGame} className="new-game">New Game</button>
            </div>
        )
    }
    if (!current) {
        return (
            <section className="loading-screen">
                <p className="loading">Loading...</p>
                <button onClick={newGame}>if it takes more than 10 seconds click</button>
            </section>
        )
    }
    
    function nextQuestion(){
        
        if(isLastQuestion){
            setIsFinished(true)
        }
        else{
            setCurrentQuestion(prev => prev + 1)
        }
    }
    function newGame(){
        setCurrentQuestion(0)
        setIsFinished(false)
        getQuestion()
    }
    return (
        <main>
            <Header />
            <p className="question-counter">Question {currentQuestion + 1} / {question.length}</p>
            <section className="question-container">
                <div className="question">
                    <p>Category: {current.category}</p>
                    <h2>{current.question}</h2>
                    {current.answers.map(a => {
                        const answerClass = a === current.selectedAnswer ? "picked" : ""
                        
                        return (
                                <button
                                    key={a}
                                    onClick={() => toggleAnswer(current.id, a)}
                                    className={answerClass}
                                >
                                    {a}
                                </button>

                        )
                    })}
                    
                </div>
            </section>
            <button 
                className="next-button" 
                onClick={nextQuestion}
                disabled={!current.selectedAnswer}
                >{isLastQuestion ? "Show result" : "Next question"}
            </button>
            
        </main>
    )
}

