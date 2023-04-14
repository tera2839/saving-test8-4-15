import { ExpandLessRounded } from '@mui/icons-material'
import { deleteDoc, doc } from 'firebase/firestore'
import React, { useState } from 'react'
import db, { auth } from '../../firebase'
import "./Calender.css"


const BreakDown = ({date,save,name, value, uid}) => {

  const [del, setDel] = useState("delete-container close")

  const breakDel = () => {
    setDel("delete-container")
  }

  const delCansel = () => {
    setDel("delete-container close")
  }

  const delContent = async (date, name) => {
    await deleteDoc(doc(db, "calenders", auth.currentUser.uid + name + date))
    setDel("delete-container close")
  }

  return (
    <div className='breakdown' key={date}>
      <p>{date}</p>
      <p>{name}</p>
      <p>貯金 +{save}円</p>
      <button className='breakdown-delete' onClick={breakDel}>
        削除
      </button>

      <div className={del}>
        <button className="breakdown-cansel-button" onClick={delCansel} >
          キャンセル
        </button>
        <button className='breakdown-delete-button' 
        onClick={() => delContent(date, name)}>
          本当に削除しますか？
        </button>
      </div>
    </div>
  )
}

export default BreakDown