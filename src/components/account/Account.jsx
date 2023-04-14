import { collection, deleteDoc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import db, { auth } from '../../firebase'
import "./Account.css"
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

const Account = () => {

  const [goal, setGoal] = useState([])
  const [deletes, setDeletes] = useState("delete-form")
  const [toggle, setToggle] = useState(false)

  const handleAllDelete = () => {
    if(!toggle) {
      setDeletes("delete-form open")
    }
  }

  const DelCollection = async (collectionRef) => {
    const querySnapshot = await getDocs(collectionRef);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  }

  const CheckDelete = () => {
    const goalRef = collection(db, "goal");
    const expenseRef = collection(db, "expense");
    const calendarRef = collection(db, "calenders");
    const memberRef = collection(db, "member")
  
    DelCollection(query(goalRef, where("uid", "==", auth.currentUser.uid)));
    DelCollection(query(expenseRef, where("uid", "==", auth.currentUser.uid)));
    DelCollection(query(calendarRef, where("uid", "==", auth.currentUser.uid)));
    DelCollection(query(memberRef, where("uid", "==", auth.currentUser.uid)));
    useNavigate("/")
  }

  const handleCansel = () => {
    setDeletes("delete-form")
  }

  useEffect(() => {
    const Data = collection(db, "goal");
    const q = query(Data, orderBy("timestamp", "desc"))
    onSnapshot(q, (QuerySnapshot) => {
      const filterData = QuerySnapshot.docs
      .map((doc) => doc.data())
      .filter((data) => data.uid === auth.currentUser.uid)
      setGoal(filterData);
    })
   },[])

  return (
    <div className='account'>
      <div className='goal-titles'>
        <h1>アカウント</h1>
        <PersonIcon className='title-icon' />
      </div>
      <div className='account-info'>
        <img src={auth.currentUser.photoURL} className="account-icon" />
        <h2 className='account-name'>{auth.currentUser.displayName}</h2>
      </div>
      <div className='delete-button-form'>
        <button className='all-delete' onClick={handleAllDelete}>
          現在の目標を破棄する
        </button>
      </div>
      <div className='sign-outs'>
        <button className='sign-out' onClick={() => auth.signOut()}>
        サインアウト
        </button>
      </div>
      <div className={deletes}>
        <div className='delete-content'>
          <h3>本当に削除してもよろしいですか？</h3>
          {goal.map((go) => (
            <div className='delete-name' key={go.name}>
              <h4>目標:{go.name}</h4>
              <h4>目標金額:{go.goalmoney}円</h4>
            </div>
          ))}
          <div className='delete-buttons'>
            <button className='del-button can'
             onClick={handleCansel} >キャンセル</button>
            <button className='del-button del'
             onClick={CheckDelete} >削除する</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account