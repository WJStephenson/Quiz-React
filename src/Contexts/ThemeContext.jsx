//global state to store current theme settings

import { useState, createContext, useEffect } from 'react'

export const ThemeContext = createContext()

export default function ThemeContextProvider(props) {

    const [ darkMode, setDarkMode ] = useState(true)

    //when theme button is clicked, change the main and secondary color css variables
    useEffect(() => {
        if(darkMode) {
            document.documentElement.style.setProperty('--main-color', 'black');
            document.documentElement.style.setProperty('--secondary-color', 'white');
        } else {
            document.documentElement.style.setProperty('--main-color', 'white');
            document.documentElement.style.setProperty('--secondary-color', 'black');
        }
    }, [darkMode])

    return(
        <ThemeContext.Provider value={{darkMode, setDarkMode}}>
            {props.children}
        </ThemeContext.Provider>
    )
}