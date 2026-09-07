import padsData from "./pads.js"
import { useState } from "react"
import React from "react"
import Pad from "./Pad.jsx"

export default function App() {
    
    const [pads, setPads] = useState(padsData)
        /**
         * Challenge:
         * Call setPads to update the state of the one pad that was
         * clicked. Map over the previous pads array, and if the current
         * item you're iterating over has the same id as the `id` passed
         * to this function, then return a new object with the `on` value
         * set to the opposite of what it was before.
         * Otherwise (if the ids don't match), just return the previous
         * item as it was, unchanged.
         */
    
    function toggle(id){
        setPads(prev => prev.map(pad=>{
            return pad.id === id ? {...pad, on : !pad.on} : pad
        }))
    }

    const blocks = pads.map((pad)=>{
         
        return (
            <Pad toggle={toggle} id={pad.id} key={pad.id} color={pad.color} on={pad.on} />
        )
    })

    
    

    return (
        <main>
            <div className="pad-container">
                {blocks}
            </div>
        </main>
    )
}












        //? COUNT
    // const [count, setCount] = React.useState(0)

    // function add() {
    //     setCount(prevCount => prevCount + 1)
    // }

    // function subtract() {
    //     setCount(prevCount => prevCount - 1)
    // }
    
   
    // return (
    //     <main className="container">
    //         <div className="counter">
    //             <button
    //                 className="minus"
    //                 onClick={subtract}
    //                 aria-label="Decrease count"
    //             >-</button>

    //             <Count number={count}/>

    //             <button
    //                 className="plus"
    //                 onClick={add}
    //                 aria-label="Increase count"
    //             >+</button>
    //         </div>
    //     </main>
    // )