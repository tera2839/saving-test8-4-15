import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import db, { auth } from '../../firebase'
import MainCalenderGraph from './MainCalenderGraph'
import "./MainExpense.css"
import MainExpenseGraph from './MainExpenseGraph'
import MainExpensePieGraph from './MainExpensePieGraph'

const MainExpense = () => {

  const [expense, setExpense] = useState([])
  const [total, setTotal] = useState([])

  const getExpense = () => {
    const data = collection(db,"expense")
    const q = query(data, orderBy("timestamp", "desc"))
    onSnapshot(q,(snapshot) => {
      const filterData = snapshot.docs
      .map((doc) => doc.data())
      .filter((data) => data.uid == auth.currentUser.uid)
      setExpense(filterData)
    })
  }

  const getTotalData = () => {
    const data = collection(db,"expense")
    const q = query(data, orderBy("timestamp", "desc"))
    onSnapshot(q,(snapshot) => {
      const filterData = snapshot.docs
      .map((doc) => doc.data())
      .filter((data) => data.uid === auth.currentUser.uid)
      .map((data) => data.expenseMoney)
      setTotal(filterData)
    })
  }

  useEffect(() => {
    getExpense();
    getTotalData();
  },[])

  const sum = total.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  
 const average = Math.floor(sum / expense.length);

  return (
    <div className='main-expense'>
      <h1>出費</h1>
      <div className='main-expense-middle'>
        <div className='main-expense-left'>
          <div className='main-expense-title'>
            <h1>現在の出費</h1>
            <h2>総額{sum}円</h2>
          </div>
          <div className='main-expense-content'>
            <h3>1回あたりの平均出費額</h3>
            <p>{average}円</p>
          </div>
          <div className='main-expense-recent'>
            <h3>最近の出費</h3>
            {expense.slice(0, 3).map((ca) => (
              <div className='main-expense-comp' key={ca.name + ca.expenseMoney}>
                <p>{ca.name}</p>
                <p>+{ca.expenseMoney}円</p>
              </div>
            ))}
          </div>
        </div>
        <div className='main-expense-right'>
          <MainExpensePieGraph />
        </div>
      </div>
      <div className='main-expense-bottom'>
        <MainExpenseGraph />
      </div>
    </div>
  )
}

export default MainExpense