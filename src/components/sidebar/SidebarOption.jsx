import React from 'react'
import "./SidebarOption.css"

const SidebarOption = ({text, Icon}) => {
  return (
    <div className='sidebar-option'>
      <Icon className="sidebar-option-icon" />
      <h3>{text}</h3>
    </div>
  )
}

export default SidebarOption