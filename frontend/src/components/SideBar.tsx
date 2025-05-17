import React from "react";
import { FaHome } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { TbLogout2 } from "react-icons/tb";

import './css/side-bar.css'
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigator = useNavigate();
  const user = sessionStorage.getItem('user');
  return (
    <nav className="side-bar">
      <ul>
        <li onClick={() => { navigator('/') }}><FaHome /> <span className="ml-2">Home</span></li>
        <li onClick={()=>{navigator('/profile')}}><FaRegUser /> <span className="ml-2">Following</span></li>
        <li onClick={()=>{navigator('/profile')}}><CiBookmark /> <span className="ml-2">Saved</span></li>
        <li onClick={()=>{navigator('/profile')}}><FaRegUserCircle /> <span className="ml-2">Profile</span></li>
      </ul>
      <div className="flex items-center mt-auto mb-1 cursor-pointer">
        {user != null || user != undefined ? (
          <>
            <TbLogout2 />
            <span className="ml-2" onClick={() => { sessionStorage.clear(); navigator('/login'); }}>Log out</span>
          </>
        ) : (
          <>
            <TbLogout2 />
            <span className="ml-2" onClick={() => { sessionStorage.clear(); navigator('/login'); }}>Iniciar Sesion</span>
          </>
        )}

      </div>
    </nav>
  )
}
