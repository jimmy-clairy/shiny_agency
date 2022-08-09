import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './pages/Home/Home'
import Survey from './pages/Survey/Survey'
import Results from './pages/Results/Results'
import Freelances from './pages/Freelances/Freelances'
import Header from './components/Header/Header'
import Error from './components/Error/Error'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    div {
        font-family: 'Trebuchet MS', Helvetica, sans-serif;
    }
`

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <GlobalStyle />
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/survey/:questionNumber" element={<Survey />} />
      <Route path="/results" element={<Results />} />
      <Route path="/freelances" element={<Freelances />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>
)
