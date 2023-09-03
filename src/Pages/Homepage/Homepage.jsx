//homepage with link to api documentation in new tab

import './Homepage.css'

function Homepage() {

    return (
        <div className='homepage-wrapper'>
            <div className='homepage-container'>
                <h1>A simple place to enjoy testing your knowledge.</h1>
                <h3>Try our Quick Quiz to test your general knowledge, or Create a Quiz to pick a category.</h3>
                <p>Developed using the <a href='https://opentdb.com/' target='_blank'>Open Trivia Database</a></p>
            </div>
        </div>
    )
}

export default Homepage