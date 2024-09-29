// RightItems.js
import React from 'react';

function RightItems() {
  return (
    <div className="right-items">
      <li id="interactive-mode">
        <a>Interactive Mode</a>
        <span className="material-symbols-outlined"> toggle_off </span>
      </li>
      <li>
        <span className="material-symbols-outlined"> shopping_cart </span>
      </li>
      <span id="userid">
        <li><a href="login.html">Login</a></li>
        <li><a href="signup.html">Sign Up</a></li>
      </span>
    </div>
  );
}

export default RightItems;
