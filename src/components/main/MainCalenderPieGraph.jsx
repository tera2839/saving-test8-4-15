import React, { useEffect, useState } from 'react'
import {Chart as ChartJs, ArcElement, Tooltip, Legend} from "chart.js"
import { Doughnut } from 'react-chartjs-2'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import db, { auth } from '../../firebase'
import "./MainCalender.css"

ChartJs.register(
  ArcElement, Tooltip, Legend
)

const MainCalenderPieGraph = () => {

  const [goal, setGoal] = useState([])
  const [save, setSave] = useState([])
  const [gdata, setGdata] = useState([])
  const [option, setOption] = useState([])

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
    const data = collection(db,"calenders")
    const q = query(data, orderBy("timestamp", "desc"))
    onSnapshot(q,(snapshot) => {
      const filterData = snapshot.docs
      .map((doc) => doc.data())
      .filter((data) => data.uid === auth.currentUser.uid)
      .map((data) => data.save)
      setSave(filterData)
    })
  }

  useEffect(() => {
    getGoalData();
    getExpenseData();
  },[])

  const sum = save.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const parsent = sum / goal * 100.;
  const mathpar = parsent.toFixed(2)

  const data = {
    labels: ["貯金額", "目標金額"],
    datasets: [{
      label: [],
      data: [sum, goal],
      backgroundColor: ["rgb(138, 233, 255)", "rgb(247, 237, 130)"],
      border: "none"
    }]
  }
  const options = {

  }

  return (
    <div className='parsents'>
      <h3 className='parsent-title'>達成率</h3>
      <div style={{width: "380px", height: "380px", position: "relative",}} className="parsent-box">
      <p className='goal-parsent'>{mathpar}%</p>
        <Doughnut
        data={data}
        options={options}
        ></Doughnut>
      </div>
    </div>
  )
}

export default MainCalenderPieGraph