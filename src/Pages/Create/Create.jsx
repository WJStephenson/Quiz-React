//this page allows the user to select a category and number of questions before navigating to the quiz. state passed as URL params on navigate

import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Create.css'
import axios from 'axios'

function Categories() {

    const questionCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] //array of option for number of questions

    let navigate = useNavigate() //set navigate to set route

    const [categories, setCategories] = useState([]) //state for categories from api
    const [selectedCategory, setSelectedCategory] = useState('') //state to store selected category from user input
    const [categorySelected, setCategorySelected] = useState(false) //state to see if a category has been selected
    const numberOfQuestions = useRef(0) //store number of questions as ref - no re-render required


    //axios call on page load to get categories from api
    axios.get(`https://opentdb.com/api_category.php`)
        .then(res => {
            setCategories(res.data.trivia_categories)
            console.log(res)
        })
        .catch(err => console.log(err))


    // handle input using click event
    function handleClick(e) {
        if (categorySelected) {
            //store number of questions and navigate to quiz
            numberOfQuestions.current = e.target.value
            navigate(`/createquiz/${selectedCategory}/${numberOfQuestions.current}`)
        } else {
            //store selected category and update selected state to re-render component
            setSelectedCategory(e.target.value)
            setCategorySelected(true)
        }
    }

    return (
        <>
            <h3 className='select-heading'>{categorySelected ? 'Select number of questions' : 'Select a category'}</h3>
            <div className='select-container'>
                {
                    categorySelected ?

                        questionCount.map((count, index) => {
                            return <button key={index} className='category' value={count}
                                onClick={handleClick}
                            >{count}</button>
                        })

                        :

                        categories.map((category, index) => {
                            return <button key={index} className='category' value={category.id}
                                onClick={handleClick}
                            >{category.name}</button>
                        })
                }

            </div>
        </>
    )
}

export default Categories