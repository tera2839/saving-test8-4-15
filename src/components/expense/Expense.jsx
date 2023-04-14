import AddCardIcon from '@mui/icons-material/AddCard';
import { collection, doc, Firestore, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import db, { auth } from '../../firebase';
import "./Expense.css"
import expenseImg from "./expense.png"
import ExpenseBox from './ExpenseBox';

const Expense = () => {

  const [goal, setGoal] = useState([])
  const [expenses,setExpenses] = useState([])
  const [name, setName] = useState("")
  const [money, setMoney] = useState()
  const [totalData, setTotalData] = useState([])
  const [ranking,setRanking] = useState([]);

  const addExpense = () => {
    const Data = doc(db, "expense", auth.currentUser.uid + name )
    const load = {
      name: name,
      expenseMoney: Number(money),
      uid: auth.currentUser.uid,
      timestamp: serverTimestamp(),
    }
    setName("")
    setMoney(0)
    setDoc(Data,load)
  }

  const getExpenseData = () => {
    const commentData = collection(db, "expense");
    const q = query(commentData, orderBy("timestamp", "desc"))
    onSnapshot(q, (QuerySnapshot) => {
      const filterData = QuerySnapshot.docs
      .map((doc) => doc.data())
      .filter((data) => data.uid === auth.currentUser.uid)
      setExpenses(filterData);
    })
  }

  const getExpenseTotalData = () => {
    const Data = collection(db, "expense");
    const q = query(Data, orderBy("timestamp", "desc"))
    onSnapshot(q, (QuerySnapshot) => {
      const filterData = QuerySnapshot.docs
      .map((doc) => doc.data())
      .filter((data) => data.uid === auth.currentUser.uid)
      .map((data) => data.expenseMoney)
      setTotalData(filterData);
    })
  }

  const sortRanking = () => {
   const data = collection(db, "expense")
   const qData = []
   onSnapshot(data, (snapshot) => {
    const filtData = snapshot.docs
    .map((doc) => doc.data())
    .filter((data) => data.uid === auth.currentUser.uid)
    const sortedData = filtData.sort((a, b) => b.expenseMoney - a.expenseMoney);
    const topData = sortedData.slice(0, 3)
    topData.forEach((to) => {
      qData.push({
        name: to.name,
        money: to.expenseMoney,
      })
    })
    setRanking(qData)
   })
  }
  

  useEffect(() => {
    getExpenseData();
    getExpenseTotalData();
    sortRanking();
   },[])

   const sum = totalData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return (
    <div className='expense'>
      <div className='goal-title'>
        <h1>出費の管理や追加</h1>
        <h2>日々の出費を管理して見ましょう</h2>
        <AddCardIcon className="title-icon" />
      </div>
      <div className='expense-images'>
        <img src={expenseImg} className="expense-img" />
      </div>
      <div className='expense-container'>
        <div className='expense-main'>
          <h3>出費の追加</h3>
          <div className='expense-name' >
            <p>名前</p>
            <input  
              type='text'
              onChange={(e) => setName(e.target.value)} 
              value={name}
              placeholder="名前"/>
          </div>
          <div className='expense-money' >
            <p>金額</p>
            <input 
             type='text'
             onChange={(e) => setMoney(e.target.value)} 
             value={money}
             placeholder="金額" />
          </div>
          <button className='expense-add-button' onClick={addExpense}>
            追加する
          </button>
        </div>
        <div className='expense-side' >
          {expenses.map((ex) => (
           <ExpenseBox 
           name={ex.name}
           money={ex.expenseMoney}
           key={ex.name + ex.expenseMoney} />
          ))}
        </div>
      </div>
      <div className='expense-graph'>
        <h2>出費の合計: {sum}円</h2>
        <h3 className='expense-ranking-title'>出費ランキング</h3>
        <div className='expense-rank'>
          <h2 className='one'>1位</h2>
          <h2 className='two'>2位</h2>
          <h2 className='three'>3位</h2>
        </div>
        <div className='expense-rankings'>
          {ranking.map((ra) => (
            <div className='expense-ranking' key={ra.name}>
              <h3>{ra.name}:</h3>
              <h3 className='expense-ranking-money'>{ra.money}円</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Expense