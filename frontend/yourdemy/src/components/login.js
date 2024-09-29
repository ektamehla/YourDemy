import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("")
  const navigate  = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", userData);
      console.log(response.data.user);
      console.log('Successful login!!');
      sessionStorage.setItem("isAuthenticated", true);
      sessionStorage.setItem("userEmail", userData.email)
      sessionStorage.setItem("userData",JSON.stringify(response.data.user))
      window.dispatchEvent(new Event("userData_Changed"));
      navigate('/home')
      //TODO remove login signup button and show 'Wecome user name'

    } catch (error) {
      // console.error("Login error:", error.response);
      // Handle login error
      console.log("Login error",error,error.response.data.error)
      setErrorMsg(error.response.data.error)
    }
  };

  return (
    <div style={{height: '100vh'}}>
    <div className="container login">
      <h2>Login to YourDemy</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
        <br />
        <button type="button" onClick={()=>navigate('/signup')}>Sign Up</button>
      </form>
      {errorMsg && <div className="error-msg">{errorMsg}</div>}
    </div>
    </div>
  );
}

export default Login;
