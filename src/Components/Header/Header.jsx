//sticky component at the top of the page with SPA route navigation

import './Header.css'
import { ScoreContext } from '../../Contexts/ScoreContext'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { ThemeContext } from '../../Contexts/ThemeContext'
import { AiOutlineMenu as Menu } from "react-icons/ai";


function Header() {

  const scoreContext = useContext(ScoreContext) //retrtieve global score state from context
  const { darkMode, setDarkMode } = useContext(ThemeContext) //retrieve global state fro theme
  const [visible, setVisible] = useState(true); //is mobile menu visible or not

  //toggle theme on theme button click
  function themeChange() {
    setDarkMode(!darkMode)
  }

  //toggle mobile menu visibility
  function toggleMenu() {
    setVisible(!visible)
  }

  //mobile and desktop menu's
  return (
    <nav className='nav-container'>
      <nav className='header-container'>
        <button className='theme-button' onClick={themeChange}>{darkMode ? <MdLightMode /> : <MdDarkMode />}</button>
        <Link to={"/"}>Home</Link>
        <span>/</span>
        <Link to={"/create"}>Create A Quiz</Link>
        <span>/</span>
        <Link to={`/quickquiz/any/10`}>Quick Quiz</Link>
        <Menu className='hamburger-menu' onClick={toggleMenu} />
        <p className='score'>{scoreContext.score} / {scoreContext.attempts}</p>
      </nav>
      <nav className='mobile-header-container' hidden={visible}>
        <div className='link-list'>
          <Link to={"/"} onClick={() => setVisible(true)}>Home</Link>
          <Link to={"/create"} onClick={() => setVisible(true)}>Create</Link>
          <Link to={`/quickquiz/any/10`} onClick={() => setVisible(true)}>Quick Quiz</Link>
          <button className='theme-button' onClick={themeChange}>{darkMode ? <MdLightMode /> : <MdDarkMode />}</button>
        </div>
      </nav>
    </nav>
  )
}

export default Header