import React from "react";
import { useNavigate } from "react-router-dom";

function Popover(props) {
  const navigate = useNavigate();
  const content = () => {
    const type = props.type;

    if (type === "courseDuration") {
      return (
        <div style={{width:'300px'}}>
          <h2>
            You are doing great!! Would you like to continue or take a break?
          </h2>
          <button onClick={() => props.setShowPopup(false)}>Continue</button>
          <button onClick={() => navigate("/home")}>Go Back</button>
        </div>
      );
    } else if (type === "quizes") {
      const cardHTML = [];
      cardHTML.push(
        <>
        <div className="title">Great Job Completing the Videos. Here is a Quiz to Test your Knowledge</div>
        </>
      )
      props.content.map((ques) => {
        cardHTML.push(
          <>
            <div className="popover-content">
             <span className="popover-ques">{ques.title}</span>
              <textarea></textarea>
            </div>
            
          </>
        );
      });
      cardHTML.push(
        <button onClick={() => props.setShowPopup(false)}>Go Back</button>
      )
      return cardHTML
    }
  };
  return (
    <div className="overlay">
      <div className="popup">{content()}</div>
    </div>
  );
}

export default Popover;
