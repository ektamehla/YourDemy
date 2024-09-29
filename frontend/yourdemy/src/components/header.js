import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useMobile from "../hooks/useMobile";
import MenuHeader from "./menuHeader";
import { handleInteractiveMode, handleLogOut } from "./util";

function Header() {
  const navigate = useNavigate()
  const isMobile = useMobile();
  const [menuOpen,setMenuOpen] = useState(false)
  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen)
  }
  const user = JSON.parse(sessionStorage.getItem("userData"));
  const [userData, setUserData] = useState(user);
  const isAuthenticated = sessionStorage.getItem("isAuthenticated")
  const onHeaderClick = (link) =>{
    setMenuOpen(false)
    navigate("/"+link)
  }
  const mode = JSON.parse(sessionStorage.getItem("userData"))?.interactive_mode 
  const [interactive_mode,setInteractiveMode] = useState(mode)

  const handleInteractiveModeToggle = () => {
    setInteractiveMode(!interactive_mode)
    handleInteractiveMode()
  }
  useEffect(() => {
    const handleInteractiveModeChange = () => {
      setUserData(JSON.parse(sessionStorage.getItem("userData")));
      setInteractiveMode(JSON.parse(sessionStorage.getItem("userData"))?.interactive_mode)
    };

    window.addEventListener("userData_Changed", handleInteractiveModeChange);

    return () => {
      window.removeEventListener(
        "userData_Changed",
        handleInteractiveModeChange
      );
    };
  }, []);

  if (isMobile) {
    return (
      <header>
        <nav>
          <ul>
            <div className="menu-div">
              <li>
                <a
                  onClick={() => onHeaderClick("home")}
                  style={{ color: "blueviolet", fontSize: "25px" }}
                >
                  YourDemy
                </a>
              </li>
              <span class="material-symbols-outlined" onClick={()=>handleMenuOpen()}>menu</span>
            </div>

            
          </ul>
        </nav>
        {menuOpen && <MenuHeader userData={userData} isAuthenticated={isAuthenticated} handleMenuOpen={handleMenuOpen} onHeaderClick={onHeaderClick}/>}
      </header>
    );
  }
  return (
    <header>
      <nav>
        <ul>
          <li><a onClick={()=>onHeaderClick('home')} style={{ color: 'blueviolet', fontSize: '25px' }}>YourDemy</a></li>
          <li><a onClick={()=>onHeaderClick('home')}>Home</a></li>
          <li><a onClick={()=>onHeaderClick('feedback')}>Feedback</a></li>
          <li><a onClick={()=>onHeaderClick('rewards')}>Rewards</a></li>
          <div className="right-items">
            {isAuthenticated &&<li id="interactive-mode">
              <a>Interactive Mode</a>
              {console.log(interactive_mode)}
              {interactive_mode?<span className="material-symbols-outlined"  onClick={()=>handleInteractiveModeToggle()}> toggle_on </span>:
              <span className="material-symbols-outlined" onClick={()=>handleInteractiveModeToggle()}> toggle_off </span>} 
         
            </li>}
            <li>
              <span className="material-symbols-outlined"> shopping_cart </span>
            </li>
            {!isAuthenticated && (<span id="userid">
              <li><a onClick={()=>onHeaderClick('login')}>Login</a></li>
              <li><a onClick={()=>onHeaderClick('signup')}>Sign Up</a></li>
            </span>)}
            {isAuthenticated && (
              <>
              <span id="userid">
              <li><label>{sessionStorage.getItem("userEmail")}</label></li>
            </span>

            <div style={{cursor:'pointer'}}onClick={()=>handleLogOut()}>Log Out</div>
            </>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
}


export default Header;
