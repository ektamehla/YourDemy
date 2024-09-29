// Dashboard.js
import React from "react";

function Dashboard(props) {
  return (
    <div className="dashboard">
      <div className="top-bar">
        <span className="material-symbols-outlined"> search </span>
        <p style={{ borderBottom: "1px solid" }}>Overview</p>
        <p>Q&A</p>
        <p>Announcements</p>
      </div>
      <div className="content">
        <div>
          <h3>About this Course: {props.title}</h3>
          
          <p>
            {props.about}
          </p>
        </div>
        <div>
          <h4>Description</h4>
          <p>
          {props.description}
          </p>
        </div>
        <div>
          <h4>Instructor</h4>
          <p>
            {props.instrs_des}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
