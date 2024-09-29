// Sidebar.js
import React, { useState } from "react";

function Sidebar(props) {
  const [openPanels, setOpenPanels] = useState({});
  const handleAccordionClick = (index) => {
    setOpenPanels((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle the state for the panel at index
    }));
  };
  const handleClose = () => {
    props.handleSidebar();
  };
  return (
    <div className="sidebar">
      <div className="top-banner">
        <div className="title">Course content</div>
        <span
          className="material-symbols-outlined"
          onClick={() => handleClose()}
        >
          {" "}
          close{" "}
        </span>
      </div>
      <div className="accordian-outer-div">
      {props?.sections?.map((section) => {
        return (
          <div className="accordion">
            <div className="accordion-item">
              <button
                className="accordion-button"
                onClick={() => handleAccordionClick(section.id)}
              >
                <div className="title">
                  {section.title}
                  <span className="material-symbols-outlined">
                    {" "}
                    expand_more{" "}
                  </span>
                </div>
                <p>4 / 6 | 13min</p>
              </button>
              <div
                className={`panel panel-${section.id}`}
                style={{
                  maxHeight: openPanels[section.id] ? "max-content" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                }}
              >
                {section.video_lectures?.map((lec) => {
                  return (
                    <p
                      style={
                        lec == props.activeCourse
                          ? { textDecoration: "underline", color: "#6b1ca5" }
                          : { cursor: "pointer" }
                      }
                      onClick={() => props.handleCourseClick(lec, section.id)}
                    >
                      {" "}
                      <span class="material-symbols-outlined">check_box</span>
                      {lec.title}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
      <div className="mark-div">
        <button
          className="mark-complete"
          style={props.courseCompleted ? { opacity: "0.3" } : null}
          disabled={props.courseCompleted}
          onClick={
            !props.courseCompleted ? () => props.handleCourseCompletion() : null
          }
        >
          {!props.courseCompleted ? "Mark as Complete" : "Completed"}
        </button>
      </div>
      </div>
    </div>
  );
}

export default Sidebar;
