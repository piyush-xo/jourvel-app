import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logIn, logOut } from "../store/AuthSlice";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/BaseURL";

function Feed() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log({ auth });
  const [user, setUser] = useState(auth.user);
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
        ? dispatch(logIn({ token: token, user: data.user })) && setUser(data.user)
        : (localStorage.removeItem("token"), navigate("/"));
    };
    verifyToken();
  }, []);

  const logoutHandler = () => {
    dispatch(logOut());
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
    {user ? <div>
      Hi {user.username}
      <button onClick={logoutHandler}>Logout</button>
    </div> : <p>Loading...</p>}</>
  );
}

export default Feed;
