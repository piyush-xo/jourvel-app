import "./Login.css";
import {user} from "../../data/Data";
import { useState } from "react";
const Login = () => {
  const [error, setError] = useState("");
  const handleLogin = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData);
    console.log("login", formJson);
    if(formJson.email !== user.email) {
      setError("👽 User not found");
      return;
    }
    else if(formJson.password !== user.password) {
      setError("👀 Wrong password");
      return;
    }
    console.log("Logged In");
  } 

  const handleRegister = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData);
    console.log("register", formJson);
  }

  return (
    <div className="main">
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div className="login">
        <form className="form" onSubmit={handleLogin}>
          <label htmlFor="chk" aria-hidden="true">
          Hi again!
          </label>
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <div style={{display:"flex", flexDirection: "column", alignItems:"center"}}>
            <button type="submit" style={{marginBottom:"2%"}}>Log in</button>
            <p className="error" style={{margin:"0", height: "15px",color:"#B8390E", borderRadius: "4px", fontWeight: "500", fontSize:"14px", backgroundColor: "#e0dede", padding:"3px 5px 5px"}}>{error}</p>
          </div>
          {/* <button type="submit">Log in</button> */}
        </form>
      </div>

      <div className="register">
        <form className="form" onSubmit={handleRegister}>
          <label htmlFor="chk" aria-hidden="true">
            Register
          </label>
          <input
            className="input"
            type="username"
            name="username"
            placeholder="Username"
            min="5"
            required
          />
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            min="8"
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Login;