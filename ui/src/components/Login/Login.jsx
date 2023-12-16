import "./Login.css";
import { user } from "../../data/Data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../store/AuthSlice";
import { baseUrl } from "../../utils/BaseURL";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData);
    console.log("login", formJson);
    const res = await fetch(`${baseUrl}/api/users/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formJson),
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 404) {
      setError("👽 User not found");
      return;
    } else if (res.status === 401) {
      setError("👀 Wrong password");
      return;
    }
    console.log("Logged In");
    dispatch(logIn({ username: data.username, email: data.email }));
    navigate("/feed");
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData);
    console.log("register", formJson);

    const res = await fetch(`${baseUrl}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formJson),
    });
    const data = await res.json();
    console.log(data);
    dispatch(logIn({ username: formJson.username, email: formJson.email }));
    navigate("/feed");
  };

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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: "80px",
            }}
          >
            <button type="submit" style={{ marginBottom: "2%" }}>
              Log in
            </button>
            {error.length > 0 && (
              <p
                className="error"
                style={{
                  margin: "0",
                  height: "15px",
                  color: "#B8390E",
                  borderRadius: "4px",
                  fontWeight: "500",
                  fontSize: "14px",
                  backgroundColor: "#e0dede",
                  padding: "3px 5px 5px",
                }}
              >
                {error}
              </p>
            )}
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
