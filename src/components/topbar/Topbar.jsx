import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../redux/apiCalls";
import { useState } from "react";
import profilePic from '../../assets/osama_profile.jpg'

export default function Topbar() {
const dispatch = useDispatch();

  const history = useHistory();
    const [user, setuser] = useState(useSelector(state=>state.user.currentUser))

  
  const handleLogout = (e) => {
    console.log("LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
    dispatch(logout);
    localStorage.clear();
    setuser(null);
    history.push('/login');

    
  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">shop admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img onClick={handleLogout} src={profilePic} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
