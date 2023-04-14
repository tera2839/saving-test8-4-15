import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import db, { auth } from '../../firebase'
import "./Goal.css"
import moneyImg from "./money011.png"
import personImg from "./person.png"
import SportsScoreIcon from '@mui/icons-material/SportsScore';

const Goal = () => {

  const [name, setName] = useState("")
  const [money, setMoney] = useState(0)
  const [active, setActive] = useState("goal-submit-text")

  const addGoal = () => {
    const goalData = doc(db, "goal", auth.currentUser.uid )
    const goalload = {
      name: name,
      goalmoney: Number(money),
      uid: auth.currentUser.uid,
      timestamp: serverTimestamp(),
    }
    setName("")
    setMoney(0)
    setActive("goal-submit-text active")
    setDoc(goalData,goalload)
  }

  return (
    <div className='goal'>
      <div className='goal-titles'>
        <h1>目標を決めてみよう！</h1>
        <SportsScoreIcon className="title-icon" />
      </div>
      <div className='goal-main'>
        <div className='goal-name'>
          <div className='goal-name-text'>
            <img src={personImg} className="goal-img-person" />
            <h2>目標の名前を決めよう</h2>
            <p>旅行や車の購入、結婚資金など名前を決めてみましょう</p>
          </div>
          <div className='set-name'>
            <h3>名前:{name}</h3>
            <input 
              type='text'
              onChange={(e) => setName(e.target.value)} 
              value={name}
              placeholder="名前" />
          </div>
        </div>
        <div className='goal-money'>
          <div className='goal-money-text'>
            <img src={moneyImg} className="goal-img-money" />
            <h2>目標金額を決めよう</h2>
            <p>目標金額を入力して下さい</p>
          </div>
          <div className='set-money'>
            <h3>¥{money}円</h3>
            <input 
              type=""
              onChange={(e) => setMoney(e.target.value)}
              value={money}
              placeholder="金額" />
          </div>
        </div>
      </div>
      <div className='goal-footer'>
        <button className='goal-submit' onClick={addGoal}>目標を追加</button>
        <p className={active} >目標を追加しました。</p>
        <p className={active} ></p>
      </div>
    </div>
  )
}

export default Goal