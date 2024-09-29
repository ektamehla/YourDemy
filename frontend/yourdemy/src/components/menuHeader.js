import React, { useState } from "react";
import { handleInteractiveMode, handleLogOut } from "./util";

function MenuHeader(props) {
  const mode = JSON.parse(sessionStorage.getItem("userData"))?.interactive_mode
  const [interactive_mode,setInteractiveMode] = useState(mode)
  
  const handleInteractiveModeToggle = () => {
    setInteractiveMode(!interactive_mode)
    handleInteractiveMode()
  }
  return (
    <div className="menu-header-div">
      <span class="material-symbols-outlined" onClick={()=>props.handleMenuOpen()} >close</span>
      <div className="right-items">
        <>
          <h3>Menu</h3>
          {props.isAuthenticated && <div id="interactive-mode">
            <a>Interactive Mode</a>
           {interactive_mode?<span className="material-symbols-outlined"  onClick={()=>handleInteractiveModeToggle()}> toggle_on </span>:<span className="material-symbols-outlined" onClick={()=>handleInteractiveModeToggle()}> toggle_off </span>} 
          </div>}
          <div style={{display:'flex',justifyContent:'center'}}>
            <a onClick={() => props.onHeaderClick("home")}>Home</a>
          </div>
          <div style={{display:'flex',justifyContent:'center'}}>
            <a onClick={() => props.onHeaderClick("feedback")}>Feedback</a>
          </div>
          <div style={{display:'flex',justifyContent:'center'}}>
            <a onClick={() => props.onHeaderClick("rewards")}>Rewards</a>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span className="material-symbols-outlined"> shopping_cart </span>
          </div>
          {props.isAuthenticated?
          <>
          <span id="userid">
             {sessionStorage.getItem("userEmail")}
            </span>
            <div style = {{marginTop:'20px',display:'flex',justifyContent:'center'}}onClick={()=>handleLogOut()}>Log Out</div>
            </>
          :<span id="userid">
            <div>
              <a onClick={() => props.onHeaderClick("login")}>Login</a>
            </div>
            <div>
              <a onClick={() => props.onHeaderClick("signup")}>Sign Up</a>
            </div>
          </span>}
        </>
      </div>
    </div>
  );
}

export default MenuHeader;
