import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './components/Homepage'
import AuthGuard from './components/AuthGuard'
import Dashboard from './components/Dashboard'
import NavBar from './components/NavBar.'


function App() {
  

  return (
    <>
      <BrowserRouter>
      <NavBar />
      <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/dashboard' element={<AuthGuard component={Dashboard} />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
