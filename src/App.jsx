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
    React.useEffect(() =>{
        const url = import.meta.env.VITE_QUIZ_URL;
        fetch(url)
        .then(res => res.json())
        .then(data => {
            const mapQuestion = data.results.map((q, index) => 
                ({question: decode(q.question),
                  id: index,
                  category: q.category,
                  answers: [...q.incorrect_answers, q.correct_answer].map(decode).sort(() => Math.random() - 0.5),
                  selectedAnswer: null, 
                  correctAnswer: decode(q.correct_answer)
                }))
            setQuestion(mapQuestion)
        })
    }
    , [])
    
            
    function toggleAnswer(id, answer){
        setQuestion(prev => prev.map(q => q.id === id ? ({...q, selectedAnswer: answer}) : q))
    }
    if (isFinished){
        return <p>congrats u have {correctQuizAnswers}/{question.length}</p>
    }
    if (!current) {
        return <p className="loading">Loading...</p>
    }
    
    function nextQuestion(){
        
        if(isLastQuestion){
            setIsFinished(true)
        }
        else{
            setCurrentQuestion(prev => prev + 1)
        }
    }
    return (
        <main>
            <Header />
            <section className="question-container">
                <div className="question">
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
            <button className="next-button" onClick={nextQuestion}>{isLastQuestion ? "Show result" : "Next question"}</button>
        </main>
    )
}

