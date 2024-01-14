import "./App.css";
import Nav from "./components/Nav";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import RouteError from "./pages/RouteError";
import { baseUrl } from "./utils/BaseURL";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "./store/AuthSlice";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("use");
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
      }
      const res = await fetch(`${baseUrl}/api/users/`, {
        method: "post",
        headers: { "x-auth-token": token },
        // credentials: "include",
      });
      const data = await res.json();

      res.status === 200
        ? dispatch(logIn({ token: token, user: data.user }))
        : (localStorage.removeItem("token"), navigate("/"));
    };
    verifyToken();
  }, []);

  return (
    <div className="app-container">
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/feed" element={<Feed />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="*" element={<RouteError />}></Route>
      </Routes>
      {/* <Nav /> */}
    </div>
  );
}

export default App;
