import { useState } from 'react'
import './App.css'
import { auth } from './firebase'
import MainComponents from './MainComponents'
import SignIn from './components/SignIn';
import { useAuthState } from "react-firebase-hooks/auth"

function App() {
  const [user] = useAuthState(auth)

  return (
    <div className="App">
     {user ? <MainComponents /> : <SignIn />} 
    </div>
  )
}

export default App
