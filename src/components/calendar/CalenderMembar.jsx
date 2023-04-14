import React from 'react'

const CalenderMembar = ({name, uid, setMember}) => {

  const handleChoice = () => {
    setMember(name)
  }


  return (
    <div className='calender-member'>
      <p onClick={handleChoice}>{name}</p>
    </div>
  )
}

export default CalenderMembar