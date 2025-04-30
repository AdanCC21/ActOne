import { FaHome } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { TbLogout2 } from "react-icons/tb";

import './css/side-bar.css'
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigator = useNavigate();
  return (
    <nav className="side-bar">
      <ul>
        <li onClick={() => { navigator('/home') }}><FaHome /> <span className="ml-2">Home</span></li>
        <li><FaRegUserCircle /> <span className="ml-2">Profile</span></li>
        <li><FaRegUser /> <span className="ml-2">Following</span></li>
        <li><CiBookmark /> <span className="ml-2">Saved</span></li>
      </ul>
      <div className="flex items-center mt-auto mb-1">
        <TbLogout2 />
        <span className="ml-2">Log out</span>
      </div>
    </nav>
  )
}
