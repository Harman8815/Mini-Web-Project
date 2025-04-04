import React from 'react'
import Canvas from './canvas';
import Customizer from './pages/Customizer.jsx'
import Home from './pages/Home.jsx'
const App = () => {
  return (
    <main className='app transition-all ease-in'>
       <Home/>
<Canvas/>
<Customizer/>
    </main>
  )
}

export default App
