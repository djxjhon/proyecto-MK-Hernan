// eslint-disable-next-line no-unused-vars
import React from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import Modo from './Componentes/Modojuego'
import Reinoselector from './Componentes/ReinoSelector';
import Invasion from './Componentes/Invasion';


function App() {

  return (
    <h1>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Modo/>}></Route>
        <Route path='/seleccionar' element={<Reinoselector/>}></Route>
        <Route path='/Invasion' element={<Invasion/>}></Route>
      </Routes>
    </BrowserRouter>
    </h1>
    
  )
}

export default App

