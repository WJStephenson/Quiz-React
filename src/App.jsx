//browser routing and context imported
//Route's set with category and number parameters for API call

import './App.css'
import Header from './Components/Header/Header'
import Quiz from './Pages/Quiz/Quiz'
import ScoreContextProvider from './Contexts/ScoreContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Create from './Pages/Create/Create'
import Homepage from './Pages/Homepage/Homepage'
import ThemeContextProvider from './Contexts/ThemeContext'

function App() {

  return (
    <BrowserRouter>
      <ScoreContextProvider>
        <ThemeContextProvider>
          <Header />

          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/quickquiz/:category/:number' element={<Quiz />} />
            <Route path='/createquiz/:category/:number' element={<Quiz />} />
            <Route path='/create' element={<Create />} />
          </Routes>

        </ThemeContextProvider>
      </ScoreContextProvider>
    </BrowserRouter>
  )
}

export default App
