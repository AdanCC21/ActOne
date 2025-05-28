import React from "react";
import { FaHome } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { TbLogout2 } from "react-icons/tb";

import './css/side-bar.css'
import { useNavigate } from "react-router-dom";
import { HandleSession } from "../Hooks/HandleSession";

export default function SideBar() {
  const navigator = useNavigate();
  const user = HandleSession(sessionStorage.getItem('user') || 'invitado');
  return (
    <nav className="side-bar">
      <ul>
        <li onClick={() => { navigator('/') }} className="text-(--yellow-500) font-semibold hover:text-(--yellow-700) duration-300"><FaHome /> <span className="ml-2">Home</span></li>
        <li className="hover:text-(--yellow-700) duration-300" onClick={() => { user.id ? navigator('/profile/mark') : navigator('/login') }}><CiBookmark /> <span className="ml-2">Saved</span></li>
        <li className="hover:text-(--yellow-700) duration-300" onClick={() => { user.id ? navigator('/profile/pub') : navigator('/login') }}><FaRegUserCircle /> <span className="ml-2">Profile</span></li>
      </ul>

      {/* <ul className="mt-5">
        <p className="text-(--yellow-500) font-bold">Popular Tags</p>
        <li className="text-(--gray)" style={{fontSize:".8em"}}>#chisme</li>
        <li className="text-(--gray)" style={{fontSize:".8em"}}>#infiel</li>
        <li className="text-(--gray)" style={{fontSize:".8em"}}>#uabc</li>
      </ul> */}
      <div className="flex items-center mt-auto mb-1 cursor-pointer">
        {user.id ? (
          <>
            <TbLogout2 />
            <span className="ml-2" onClick={() => { sessionStorage.clear(); navigator('/login'); }}>Log out</span>
          </>
        ) : (
          <>
            <TbLogout2 />
            <span className="ml-2" onClick={() => { sessionStorage.clear(); navigator('/login'); }}>Log In</span>
          </>
        )}

      </div>
    </nav>
  )
}
