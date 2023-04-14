import { collection, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import db, { auth } from '../../firebase'
import "./MainCalender.css"
import { Chart } from 'chart.js';
import MainCalenderGraph from './MainCalenderGraph';
import MainCalenderPieGraph from './MainCalenderPieGraph';
import MainCalenderMember from './MainCalenderMember';

const MainCalender = () => {

  const [calender, setCalender] = useState([])
  const [total, setTotal] = useState([])


  const getCalenderData = () => {
    const calenderData = collection(db, "calenders")
    const q = query(calenderData, orderBy("timestamp", "desc"))
    onSnapshot(q,(snapshot) => {
      const filteredData = snapshot.docs
      .map((doc) => doc.data())
      .filter((data) => data.uid === auth.currentUser.uid)
      setCalender(filteredData)
    })
  }

  const getTotalData = () => {
    const calenderData = collection(db, "calenders")
    const q = query(calenderData, orderBy("timestamp", "desc"))
    onSnapshot(q,(snapshot) => {
      const filterData = snapshot.docs
      .map((doc) => doc.data())
      .filter((data) => data.uid === auth.currentUser.uid)
      .map((data) => data.save)
      setTotal(filterData)
    })
  }

  const sum = total.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

 const average = Math.floor(sum / calender.length);

  useEffect(() => {
    getCalenderData();
    getTotalData();
  },[])

  return (
    <div className='main-calender'>
      <h1>貯金</h1>
      <div className='main-calender-middle'>
        <div className='main-calender-left'>
          <h1>現在の貯金額</h1>
          <h2>総額{sum}円</h2>
          <div className='main-calender-content'>
            <h3>貯金1回当たりの平均金額</h3>
            <p>{average}円</p>
          </div>
          <div className='main-calender-recent'>
            <h3>最近の貯金</h3>
            {calender.slice(0, 5).map((ca) => (
              <div className='main-calender-comp' key={ca.name + ca.save + ca.date}>
                <p>{ca.name}</p>
                <p>+{ca.save}円</p>
              </div>
            ))}
          </div>
        </div>
        <div className='main-calender-right'>
          <MainCalenderPieGraph />
        </div>
      </div>
      <div className='main-calender-bottom'>
        <MainCalenderGraph />
      </div>
    </div>
  )
}

export default MainCalender