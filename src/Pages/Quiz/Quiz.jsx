//gets quiz params from URL and displays questions in cards dynamically

import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import QuestionCard from '../../Components/QuestionCard/QuestionCard'
import './Quiz.css'
import { ScoreContext } from '../../Contexts/ScoreContext'
import Loading from '../../Components/Loading/Loading'

function Quiz() {

  const { setScore, setAttempts, attempts } = useContext(ScoreContext) //get global states from ScoreContext

  const [questions, setQuestions] = useState([]); //store questions in array state
  const [questionsNumber, setQuestionsNumber] = useState(0); //store current question number
  const [answered, setAnswered] = useState(false); //state to store if questions has been answered
  const [complete, setComplete] = useState(false) //state to store if all questions have been answered

  const { category, number } = useParams(); //retrieve parameters from URL passed by create quiz or quick quiz

  //reset quiz if URL parameters change to reset on load and avoid URL tampering
  useEffect(() => {
    generateQuestions();
    setComplete(false)
    setScore(0)
    setAttempts(0)
  }, [category, number]);

  //axios call to url based on URL params
  const generateQuestions = () => {
    axios
      .get(`https://opentdb.com/api.php?amount=${number}&category=${category == 'any' ? '' : category}`)
      .then((res) => {
        setQuestions(res.data.results);
        setQuestionsNumber(0); // Reset questionsNumber to 0 when new questions are fetched
      })
      .catch((err) => console.log(err));
  }

  //handle user input when button is clicked using button event
  function handleClick() {
    if (questionsNumber < (number - 1)) {
      setQuestionsNumber(questionsNumber + 1);
    } else {
      setComplete(true) //change complete state when all questions are answered to update card UI component
    }
    setAnswered(false); // Reset the answered state when moving to the next question
  }

  return (
    <div className='card-container'>
      <div>
        <p className='question-number'>{complete ? '' : `${questionsNumber + 1} of ${questions.length}`}</p>
      </div>
      {
        questions.length > 0 ? //while questions is loading display a loading icon
          <QuestionCard item={questions[questionsNumber]} questions={questions} setAnswered={setAnswered} key={questionsNumber} complete={complete} />
          :
          <Loading />
      }
      {
        answered && //display button when current question is answered, if all questions are answered display a different button message
        <button onClick={handleClick} className='next-button'>{attempts == number ? 'Finish' : 'Next Question'}</button>
      }

    </div>
  )
}

export default Quiz