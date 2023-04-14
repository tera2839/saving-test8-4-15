import { CollectionsBookmarkOutlined } from '@mui/icons-material'
import { collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import db, { auth } from '../../firebase'
import "./Calender.css"
import CalenderMembar from './CalenderMembar'

const EditCalender = ({value}) => {


  const [save, setSave] = useState("")
  const [Members, setMembers] = useState([])
  const [member, setMember] = useState("")

  const editExpense = () => {
    const Data = doc(db, "calenders", auth.currentUser.uid +   member + date)
    const load = {
      date: date,
      uid: auth.currentUser.uid,
      peruid: auth.currentUser.uid + member,
      save: Number(save),
      timestamp: serverTimestamp(),
      name: member,
    }
    setDoc(Data,load)
    setSave("")
  }

  useEffect(() => {
    const Data = collection(db, "member");
    const q = query(Data, orderBy("timestamp", "desc"))
    onSnapshot(q, (QuerySnapshot) => {
      const filterData = QuerySnapshot.docs
      .map((doc) => doc.data())
      .filter((data) => data.uid === auth.currentUser.uid)
      setMembers(filterData);
    })
   },[])

   const date = new Date(value).toLocaleDateString('ja-JP', { weekday: 'long', day: 'numeric', month: 'long' });


  return (
    <div className='edit-calender'>
      <h2>日時を選択してください</h2>
      <p className='edit-date'>{date}</p>
      <div className='edit-save'>
        <h3>今日の貯金額</h3>
        <p>{save}円</p>
        <input placeholder='金額' className='edit-input' 
        onChange={(e) => setSave(e.target.value)} value={save} type="text" />
      </div>
      <div className='edit-member'>
        <h3>メンバーの選択</h3>
        <h4 className='edit-member-name'>選択: {member}</h4>
        <p>以下から選択</p>
        {Members.map((mem) => (
          <CalenderMembar
          name={mem.name}
          uid={mem.uid}
          setMember={setMember}
          key={mem.name} />
        ))}
      </div>
      <button className='edit-button' onClick={editExpense} >貯金する</button>
    </div>
  )
}

export default EditCalender