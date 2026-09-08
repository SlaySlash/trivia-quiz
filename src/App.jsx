import React from "react"
import Header from "./components/header";

export default function App() {
    const [question, setQuestion] = React.useState([])


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
    const readyQuestion = question.map(q =>{
        return(
            <div key={q.id} className="question">
                <h2>{q.question}</h2>
                {q.answers.map(a =>{
                    return (
                        <button key={a}>
                            {a}
                        </button>
                    )
                }
                )}
            </div>
        )
    })

    return (
        <main>
            <Header />
            <section className="question-container">
                {readyQuestion}
            </section>
        </main>
    )
}

