import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './DateCalender.css'

const DateCalender = ({value, setValue}) => {


  return (
    <div className='date-calender'>
      <Calendar 
       value={value}
       onClickDay={(e) => setValue(e)}
       locale="ja-JP"
        />
    </div>
  )
}

export default DateCalender