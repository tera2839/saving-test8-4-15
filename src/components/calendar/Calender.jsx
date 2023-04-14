import React, { useEffect, useState } from 'react'
import DateCalender from './DateCalender'
import "./Calender.css"
import EditCalender from './EditCalender'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import db, { auth } from '../../firebase'
import BreakDown from './BreakDown'
import EventNoteIcon from '@mui/icons-material/EventNote';

const Calender = () => {

  const [value, setValue] = useState(new Date())
  const [calenders, setCalenders]  = useState([])
  const [totalData, setTotalData] = useState([])

  const totalValue = (save, expense) => {
    return save - expense;
  }

  const getCalenderData = () => {
    const Data = collection(db, "calenders");
        const q = query(Data, orderBy("timestamp", "desc"))
        onSnapshot(q, (QuerySnapshot) => {
          const filterData = QuerySnapshot.docs
          .map((doc) => doc.data())
          .filter((data) => data.uid === auth.currentUser.uid)
          setCalenders(filterData);
        })
  }

  const getTotalData = () => {
    const Data = collection(db, "calenders");
    const q = query(Data, orderBy("timestamp", "desc"))
    onSnapshot(q, (QuerySnapshot) => {
      const filterData = QuerySnapshot.docs
      .map((doc) => doc.data())
      .filter((data) => data.uid === auth.currentUser.uid)
      .map((data) => data.save)
      setTotalData(filterData);
    })
  }


  useEffect(() => {
        getCalenderData();
        getTotalData();
   },[])

const sum = totalData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return (
    <div className='calender'>
      <div className='calender-title'>
        <h1>貯金&カレンダー</h1>
        <h2 className='calender-sub-title'>貯金額や出費を記録しましょう</h2>
        <EventNoteIcon className='title-icon' />
      </div>
      <div className='calender-container'>
        <div className='calender-left'>
          <DateCalender value={value} setValue={setValue}
           />
        </div>
        <div className='calender-right'>
          <EditCalender  value={value} setValue={setValue} 
           />
        </div>
      </div>
      <div className='edit-graph'>
        <div className='graph-title'>
          <h2>今月の内訳</h2>
          <h3 className='edit-total'>{sum}円</h3>
        </div>
        <div className='breakdowns'>
            {calenders.map((ca) => (
              <BreakDown 
              date={ca.date}
              save={ca.save}
              totalValue={totalValue}
              value={value}
              name={ca.name}
              key={ca.name + ca.save + ca.date}
              uid={ca.uid}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Calender