import React from "react"
import Header from "./components/header";

export default function App() {
    const [question, setQuestion] = React.useState([])
    React.useEffect(() =>{
        const url = import.meta.env.VITE_QUIZ_URL;
        fetch(url)
        .then(res => res.json())
        .then(data => {
            const mapQuestion = data.results.map((q, index) => 
                ({question: q.question,
                  id: index,
                  category: q.category,
                  answers: [...q.incorrect_answers, q.correct_answer],
                  selectedAnswer: null, 
                  correctAnswer: q.correct_answer
                }))
            setQuestion(mapQuestion)
        })
    }
    , [])

    
    return (
        <main>
            <Header />
            <section className="question-container">
                <h2></h2>
                <p></p>
            </section>
        </main>
    )
}

