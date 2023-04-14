import React, { useEffect, useState } from 'react'
import {Chart as ChartJs, ArcElement, Tooltip, Legend} from "chart.js"
import { Doughnut } from 'react-chartjs-2'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import db from '../../firebase'
import "./MainCalender.css"

ChartJs.register(
  ArcElement, Tooltip, Legend
)

const MainCalenderMember = () => {
 
  const [calender, setCalender] = useState([])
  const [memberName, setMemberName] = useState([])
  const totalData = {};

  const getGoalData = () => {
    const data = collection(db,"calender")
    const q = query(data, orderBy("timestamp", "desc"))
    onSnapshot(q,(snapshot) => {
      setCalender(snapshot.docs.map((doc) => doc.data()))
    })
  }

  const getExpenseData = () => {
    const data = collection(db,"member")
    const q = query(data, orderBy("timestamp", "desc"))
    onSnapshot(q,(snapshot) => {
      setMemberName(snapshot.docs.map((doc) => doc.data().name))
    })
  }



  useEffect(() => {
    getGoalData();
    getExpenseData();
  },[])


  const data = {
    labels: memberName,
    datasets: [{
      label: [],
      data: [],
      backgroundColor: ["red", "blue","","green","yellow"],
      border: "none"
    }]
  }
  const options = {

  }

  return (
    <div className='parsents'>
      <h3 className='parsent-title'>メンバーの貯金の割合</h3>
      <div style={{width: "380px", height: "380px", position: "relative",}} className="parsent-box">
      <p className='goal-parsent'></p>
        <Doughnut
        data={data}
        options={options}
        ></Doughnut>
      </div>
    </div>
  )
}

export default MainCalenderMember