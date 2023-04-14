import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SidebarOption from './SidebarOption';
import HomeIcon from '@mui/icons-material/Home';
import AddCardIcon from '@mui/icons-material/AddCard';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import carimg from "../car.png"
import balloonimg from "../balloon.png"
import moneyimg from "../coin.png"

const Sidebar = ({side}) => {

  return (
    <div className={side} >
    <div className="sidebar">
      <div className='sidebar-title'>
        <img src={carimg} className="side-carimg"/>
        <img src={balloonimg} className="side-balloonimg" />
        <img src={moneyimg} className="side-moneyimg" />
        <AttachMoneyIcon className='sidebar-title-icon'/>
        <h2>saving</h2>
      </div>
      <div className='sidebar-main'>
        <Link to="/">
          <SidebarOption text="ホーム" Icon={HomeIcon} />
        </Link>
        <Link to="/goal">
          <SidebarOption text="目標" Icon={SportsScoreIcon} />
        </Link>
        <Link to="/expense">
          <SidebarOption text="出費" Icon={AddCardIcon} />
        </Link>
        <Link to="/member">
          <SidebarOption text="メンバー" Icon={PersonAddIcon} />
        </Link>
        <Link to="/calendar">
          <SidebarOption text="貯金" Icon={EventNoteIcon} />
        </Link>
        <Link to="/help">
          <SidebarOption text="ヘルプ" Icon={QuestionMarkIcon} />
        </Link>
        <Link to="/account">
          <SidebarOption text="アカウント" Icon={PersonIcon} />
        </Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar