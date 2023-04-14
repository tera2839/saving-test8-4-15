import React from 'react'
import "./Expense.css"

const ExpenseBox = ({name, money}) => {
  return (
    <div className='expense-box'>
      <p>{name}:</p>
      <p>{money}円</p>
    </div>
  )
}

export default ExpenseBox