//card to display the current message or question to the user

import { useEffect, useState, useContext } from 'react'
import './QuestionCard.css'
import { ScoreContext } from '../../Contexts/ScoreContext'
import { Link } from 'react-router-dom'

function QuestionCard({ item, questions, setAnswered, complete }) {


    const scoreContext = useContext(ScoreContext) //global state from context to display score at the end
    const [answers, setAnswers] = useState([]) //store answers for current question from axios API call
    const [message, setMessage] = useState('') //store message to display at the end of the quiz

    //when the questions prop updates all answers are shuffled
    useEffect(() => {
        const answerArr = [...item.incorrect_answers, item.correct_answer]
        setAnswers(() => shuffle(answerArr))
    }, [questions])

    //when quiz is complete the message is selected based on the final score
    useEffect(() => {
        const percentage = scoreContext.score / scoreContext.attempts
        if (percentage == 1) {
            setMessage('Well done! You got them all!')
            return
        }
        else if (percentage > 0.75) {
            setMessage('You got over 75%! Good Job!')
            return
        }
        else if (percentage > 0.5) {
            setMessage('More than half is above average. Well done :)')
            return
        }
        else {
            setMessage('Less than half... better luck next time')
        }

    }, [complete])

    //shuffle questions array
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex > 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    //decode returned querstions and answers from api call
    function decodeHTMLEntities(text) {
        const tempElement = document.createElement("textarea"); // Create a temporary element to decode HTML entities
        tempElement.innerHTML = text;
        return tempElement.value;
    }

    //handle answer based on button value (correct or incorrect). Update style based on answer and highlight the correct answer if incorrect is selected
    function handleAnswer(e) {
        scoreContext.setAttempts(scoreContext.attempts + 1)
        const parent = e.target.parentNode
        const children = [...parent.children] //get all buttons on the card
        if (e.target.value == "correct") {
            scoreContext.setScore(scoreContext.score + 1) //add 1 to score
            e.target.classList.add("correct-answer") //highlight the card as green
        } else {
            children.forEach(child => {
                if (child.value == "correct") {
                    child.classList.add("correct-answer") //chnage style of the correct answer if wrong one selected
                }
            })
            e.target.classList.add("wrong-answer")
            console.log("Incorrect"); //chnage style of incorrect answer if selected
        }
        children.forEach(child => {
            child.classList.remove("hover-button")
            child.setAttribute("disabled", true) //disable all buttons on the card after an answer is selected
        })
        setAnswered(true) //update state
    }




    return (
        <div className='question-card'>
            {
                complete ? //if quiz is complete show results, otherwise show quesions
                    <>
                        <div className='result-container'>
                            <h2>{scoreContext.score} out of {scoreContext.attempts}</h2>
                            <h2>{message}</h2>
                        </div>
                        <Link to={'/'}>Go back to homepage</Link>
                    </>
                    :
                    <>
                        <p className='subject'>{item?.category}</p>
                        <p className='question'>{decodeHTMLEntities(item.question)}</p>
                        <div className="answers">
                            {
                                answers.map((answer) => {
                                    console.log(answer)
                                    return <button
                                        key={answer}
                                        onClick={handleAnswer}
                                        className='hover-button'
                                        value={answer == item.correct_answer ? "correct" : "incorrect"}>
                                        {decodeHTMLEntities(answer)}
                                    </button>
                                })
                            }
                        </div>
                    </>
            }
        </div>
    )
}

export default QuestionCard