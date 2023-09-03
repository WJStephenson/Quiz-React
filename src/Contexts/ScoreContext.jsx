//global state to store current score and attempts

import { useState, createContext } from 'react'

export const ScoreContext = createContext()

export default function ScoreContextProvider(props) {

    const [ score, setScore ] = useState(0)
    const [ attempts, setAttempts ] = useState(0)

    return(
        <ScoreContext.Provider value={{score, setScore, attempts, setAttempts}}>
            {props.children}
        </ScoreContext.Provider>
    )
}