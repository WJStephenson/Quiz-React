//homepage with link to api documentation in new tab

import { Link } from 'react-router-dom'
import './Homepage.css'

function Homepage() {

    return (
        <div className='homepage-wrapper'>
            <div className='homepage-container'>
                <h1>A simple place to enjoy testing your knowledge.</h1>
                <h3>Try our <Link to={`/quickquiz/any/10`}>Quick Quiz</Link> to test your general knowledge, or <Link to={'create'}>Create a Quiz</Link> to pick a category.</h3>
                <p>Developed using the <a href='https://opentdb.com/' target='_blank'>Open Trivia Database</a></p>
            </div>
        </div>
    )
}

export default Homepage