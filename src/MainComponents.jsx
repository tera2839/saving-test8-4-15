import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes} from"react-router-dom";
import Goal from "./components/goal/Goal"
import Member from "./components/member/Member"
import Calendar from "./components/calendar/Calender"
import Help from "./components/help/Help"
import Account from './components/account/Account';
import "./App.css"
import Expense from './components/expense/Expense';
import Main from "./components/main/Main"
import Sidebar from "./components/sidebar/Sidebar"

const MainComponents = () => {

const [side, setSide] = useState("respons-sidebar")
const [active, setActive] = useState(false)
const [open, setOpen] = useState("menu-button")

const handleOpen = () => {
  if(!active) {
    setActive(true)
    setSide("respons-sidebar open")
    setOpen("menu-button open")
  } else {
    setActive(false)
    setOpen("menu-button")
    setSide("respons-sidebar")
  }
}

  return (
    <Router>
      <div className='App'>
        <div className='app-main'>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/goal' element={<Goal />} />
            <Route path='/expense' element={<Expense />} />
            <Route path='/member' element={<Member />} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path='/help' element={<Help />} />
            <Route path='/account' element={<Account />} />
          </Routes>
        </div>
        <div className={open} onClick={handleOpen} >
          <span></span>
          <span></span>
        </div>
        <div className='app-sidebar'>
          <Sidebar
          side={side} />
        </div>
      </div>
    </Router>
  )
}

export default MainComponents