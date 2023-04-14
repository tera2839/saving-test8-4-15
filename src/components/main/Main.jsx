import { Home } from '@mui/icons-material';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import db, { auth } from '../../firebase';
import "./Main.css"
import MainCalender from './MainCalender';
import MainExpense from './MainExpense';

const Main = () => {

  const [goal, setGoal]  =useState([])
  const [activeGoal, setActiveGoal] = useState(goal.uid)
  const [totalData, setTotalData] = useState([])
  const [remainingData, setRemainingData] = useState([])
  const [goalMoney, setGoalMoney] = useState([])
  const [menber, setMenber] = useState([])

  const getGoal = () => {
    const commentData = collection(db, "goal");
      const q = query(commentData, orderBy("timestamp", "desc"))
      onSnapshot(q, (QuerySnapshot) => {
        setGoal(QuerySnapshot.docs.map((doc) => doc.data()));
    })
  }

  const getGoalMoney = () => {
    const commentData = collection(db, "goal");
      const q = query(commentData, orderBy("timestamp", "desc"))
      onSnapshot(q, (QuerySnapshot) => {
        const filteredData = QuerySnapshot.docs
          .map((doc) => doc.data())
          .filter((data) => data.uid === auth.currentUser.uid)
          .map((data) => data.goalmoney);
        setGoalMoney(filteredData);
      });
  }

  const getCalenderTotalData = () => {
    const Data = collection(db, "calenders");
    const q = query(Data, orderBy("timestamp", "desc"))
    onSnapshot(q, (QuerySnapshot) => {
      const filterData = QuerySnapshot.docs
      .map((doc) => doc.data())
      .filter((data) => data.uid === auth.currentUser.uid)
      .map((data) => data.save)
      setTotalData(filterData)
    })
  }

  const getMenber = () => {
    const Data = collection(db, "member");
    const q = query(Data, orderBy("timestamp", "desc"))
    onSnapshot(q, (QuerySnapshot) => {
      const filteredData = QuerySnapshot.docs
      .map((doc) => doc.data())
      .filter((data) => data.uid === auth.currentUser.uid);
      setMenber(filteredData);
    })
  }

  useEffect(() => {
    getGoal();
    getCalenderTotalData();
    getGoalMoney();
    getMenber();
  },[])

  const sum = totalData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const mathSum = goalMoney - sum;


  return (
    <div className='main'>
      <div className='main-title-name'>
        <h1>ホーム</h1>
        <Home className='title-icon'/>
      </div>
      {goal.map((go) => (
         go.uid === auth.currentUser.uid &&
        <div className='main-title' key={go.name}>
          <h1>目標: {go.name}</h1>
          <h1>目標金額: {go.goalmoney}円</h1>
        </div>
      ))}
      <div className='main-remaining'>
        <h1>目標まであと: {mathSum}円</h1>
        <h3>現在のメンバー{menber.length}人</h3>
        <div className='main-member'>
          {menber.map((me) => (
            <h2 key={me.name}>{me.name}</h2>
          ))}
        </div>
      </div>
      <div className='main-calender'>
        <MainCalender />
      </div>
      <div className='main-expense'>
        <MainExpense />
      </div>
    </div>
  )
}

export default Main