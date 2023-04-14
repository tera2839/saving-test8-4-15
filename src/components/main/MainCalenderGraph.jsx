import React, { useEffect, useState } from 'react'
import { Chart as ChartJs, BarElement, CategoryScale, LinearScale, Tooltip, Legend, LineElement,PointElement, } from "chart.js"
import { Bar, Line } from 'react-chartjs-2'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import db, { auth } from '../../firebase'
import "./MainExpense.css"
import { handleBreakpoints } from '@mui/system'

ChartJs.register(
  LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend
)

const MainCalenderGraph = ({}) => {

  const [saveData, setSaveData] = useState([])
  const [dateData, setDateData] = useState([])


  const data = {
    labels: dateData,
    datasets: [{
      label: `直近${dateData.length}回の貯金`,
      data: saveData,
      borderColor: "rgb(148, 129, 255)" ,
      backgroundColor: ["rgb(148, 129, 255)" ],
      tension: 0.3,
    }]
  }

  const options = {

  }

  const calenderData = () => {
    const data = collection(db, "calenders")
    const q = query(data, orderBy("timestamp", "desc"))
    const backData = []
    const backDate = []
    onSnapshot(q, (snapshot) => {
      const snapData = snapshot.docs.map((doc) => doc.data())
      .filter((data) => data.uid === auth.currentUser.uid)
      const filterData = snapData.slice(0, 10)
      filterData.forEach((fi) => {
        backData.unshift(fi.save)
        backDate.unshift(fi.date)
      })
      setSaveData(backData)
      setDateData(backDate)
    })
  }

  useEffect(() => {
    calenderData();
  },[])

  return (
    <div className="graph">
      <Line
      data={data}
      options={options}
      >
      </Line>
    </div>
  )
}

export default MainCalenderGraph