import React, { useEffect, useState } from 'react'
import {Chart as ChartJs, ArcElement, Tooltip, Legend} from "chart.js"
import { Doughnut } from 'react-chartjs-2'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import db, { auth } from '../../firebase'
import "./MainExpense.css"

ChartJs.register(
  ArcElement, Tooltip, Legend
)

const MainExpensePieGraph = () => {
 
  const [goal, setGoal] = useState([])
  const [save, setSave] = useState([])
  const [name, setName] = useState([])

  const getGoalData = () => {
    const data = collection(db,"goal")
    const q = query(data, orderBy("timestamp", "desc"))
    onSnapshot(q,(snapshot) => {
      const filterData = snapshot.docs
      .map((doc) => doc.data())
      .filter((data) => data.uid === auth.currentUser.uid)
      .map((data) => data.goalmoney)
      setGoal(filterData)
    })
  }

  const getExpenseData = () => {
    const data = collection(db,"expense")
    const q = query(data, orderBy("timestamp", "desc"))
    onSnapshot(q,(snapshot) => {
      const filterData = snapshot.docs
      .map((doc) => doc.data())
      .filter((data) => data.uid === auth.currentUser.uid)
      const exData = filterData.map((data) => data.expenseMoney)
      const naData = filterData.map((data) => data.name)
      setSave(exData)
      setName(naData)
    })
  }

  useEffect(() => {
    getGoalData();
    getExpenseData();
  },[])

  const sum = save.reduce((accumulator, currentValue) => accumulator + currentValue, 0);



  const data = {
    labels: name,
    datasets: [{
      label: [],
      data: save,
      backgroundColor: ["red", "blue", "green", "yellow", "purple", "aqua", ""],
      border: "none"
    }]
  }
  const options = {

  }

  return (
    <div className='parsents'>
      <h3 className='expense-parsent-title'>出費の割合</h3>
      <div style={{width: "400px", height: "400px", position: "relative",}} className="parsent-box">
      <p className='expense-parsent'>{sum}円</p>
        <Doughnut
        data={data}
        options={options}
        ></Doughnut>
      </div>
    </div>
  )
}

export default MainExpensePieGraph