import { collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import db, { auth } from '../../firebase'
import membarImg from "./membar.png"
import "./Membar.css"
import MemberContent from './MemberContent'
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Member = () => {


  const [member, setMember] = useState("membar-form")
  const [memberName, setMemberName] = useState(false)
  const [membars, setMembars] = useState([])
  const [name, setName] = useState("")
  const [money, setMoney] = useState(0)

  const handleAddMembar = () => {
    const Data = doc(db, "member", auth.currentUser.uid + name)
    const load = {
      name: name,
      money: Number(money),
      uid: auth.currentUser.uid ,
      timestamp: serverTimestamp(),
    }
    setName("")
    setMoney(0)
    setDoc(Data, load)
    setMember("membar-form")
  }

  const handleAdd = () => {
    if(!memberName) {
      setMember("membar-form open")
    }
  }

  useEffect(() => {
    const Data = collection(db, "member");
    const q = query(Data, orderBy("timestamp", "desc"))
    onSnapshot(q, (QuerySnapshot) => {
      const filterData = QuerySnapshot.docs
      .map((doc) => doc.data())
      .filter((data) => data.uid === auth.currentUser.uid)
      setMembars(filterData);
    })
   },[])

  return (
    <div className='membars'>
      <div className='goal-titles'>
        <h1>メンバーの管理</h1>
        <PersonAddIcon className='title-icon'/>
      </div>
      <div className='menbar-main'>
        <div className='membar-container'>
          <div className='membar-header'>
            <h2>メンバーの追加や削除ができます</h2>
            <img src={membarImg} className="member-img" />
          </div>
          <div className='membar-content'>
            <div className='membar-membar'>
            <button className='membar-add' onClick={handleAdd}>
              メンバーの追加 +
            </button>
              {membars.map((mem) => (
                <MemberContent 
                name={mem.name} 
                key={mem.name} />
              ))}
          </div>
          <div className={member}>
            <h3>新しいメンバーの追加</h3>
            <div className='membar-setname'>
              <p>名前</p>
              <input placeholder='名前'  onChange={(e) => setName(e.target.value)} value={name} />
            </div>
            <button className='membar-add-end'
             onClick={handleAddMembar}>
              メンバーを追加する
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Member