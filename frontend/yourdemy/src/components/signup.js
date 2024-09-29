import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { OverlayTrigger, Tooltip } from 'react-bootstrap'; // Import the question mark icon

function Signup() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [interactiveMode, setInteractiveMode] = useState(false);
    const [specialOffers, setSpecialOffers] = useState(false);
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("")

    const handleSignup = async (e) => {
      e.preventDefault();
      const userData = {
        name: fullName,
        email: email,
        password: password,
        interactive_mode: interactiveMode,
        special_offers: specialOffers,
      };
  
      try {
        const response = await axios.post("http://127.0.0.1:8000/signup/", userData);
        sessionStorage.setItem("isAuthenticated", true);
        sessionStorage.setItem("userEmail", userData.email);
        sessionStorage.setItem("userData", JSON.stringify(response.data));
        navigate("/home");
      } catch (error) {
        // Handle signup error
        console.log("Signup error",error,error.response.data.error)
        setErrorMsg(error.response.data.error)
      }
    };

    const interactiveModeTooltip = (
      <Tooltip id="tooltip-interactiveMode" style={{ backgroundColor: "#f0f0f0", color: "cadetblue", width:'30%' }}>
        <text >
          Interactive mode provides custom options for video lengths of the lectures and quiz location options for the courses 
        </text>
      </Tooltip>
    );

    return (
        <div className="container signup">
          <h2>Sign up and start learning</h2>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-start",
            textAlign: "start",
            width: "50%",
            marginBottom: "30px",
          }}>
              <input
                type="checkbox"
                id="interactiveMode"
                checked={interactiveMode}
                onChange={(e) => setInteractiveMode(e.target.checked)}
              />
              <label htmlFor="interactiveMode" style={{ marginRight: "5px" }}>Interactive Mode</label>

              <OverlayTrigger
                placement="right"
                overlay={interactiveModeTooltip}
                trigger={['hover','click']}
              >
                <div style={{ cursor: "pointer" }}>                
                <span className="material-symbols-outlined"> question_mark </span>
                </div>
              </OverlayTrigger>
            </div>
            <div style={{ display: "flex" }}>
              <input
                type="checkbox"
                id="specialOffers"
                checked={specialOffers}
                onChange={(e) => setSpecialOffers(e.target.checked)}
              />
              <label htmlFor="specialOffers">Send me special offers, personalized recommendations, and learning tips</label>
            </div>
            <br />
            <button type="submit">Sign Up</button>
            <br />
            <button type="button" onClick={() => navigate('/login')}>Login</button>
            {errorMsg && <div className="error-msg">{errorMsg}</div>}
          </form>
        </div>
    );
}

export default Signup;


