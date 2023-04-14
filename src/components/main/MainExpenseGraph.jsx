import React, { useEffect, useState } from 'react'
import { Chart as ChartJs, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js"

import { Bar } from 'react-chartjs-2'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import db, { auth } from '../../firebase'
import "./MainExpense.css"

ChartJs.register(
  BarElement, CategoryScale, LinearScale, Tooltip, Legend
)

const MainExpenseGraph = () => {
 
  const [expenseData, setExpenseData] = useState([])
  const [nameData, setNameData] = useState([])


  const data = {
    labels: nameData,
    datasets: [{
      label: `出費が高い順: ${expenseData.length}`,
      data: expenseData,
      borderColor: "black",
      backgroundColor: ["rgb(148, 129, 255)", "rgb(255, 232, 129)" ],
      borderWidth: 0,
    }]
  }

  const options = {

  }

  const calenderData = () => {
    const data = collection(db, "expense")
    const qData = []
    const dData = []
    onSnapshot(data, (snapshot) => {
      const filtData = snapshot.docs
      .map((doc) => doc.data())
      .filter((data) => data.uid === auth.currentUser.uid)
    const sortedData = filtData.sort((a, b) => b.expenseMoney - a.expenseMoney);
    const topData = sortedData.slice(0, 6)
    topData.forEach((to) => {
      qData.push(to.expenseMoney)
      dData.push(to.name)
    })
    setExpenseData(qData)
    setNameData(dData)
    })
  }

  useEffect(() => {
    calenderData();
  },[])

  return (
    <div className='graph'>
      <Bar
      data={data}
      options={options}
      >
      </Bar>
    </div>
  )
}

export default MainExpenseGraph