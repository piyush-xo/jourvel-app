import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logIn, logOut } from "../store/AuthSlice";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/BaseURL";
import styles from "./Feed.module.css";
import Gallery from "../components/Feed/Gallery";
import Header from "../components/Header";

function Feed() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log({ auth });
  const [user, setUser] = useState(auth.user);

  useEffect(() => {
    console.log("useFeed");
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
        ? dispatch(logIn({ token: token, user: data.user })) &&
          setUser(data.user)
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
    <div className={styles.container}>
      {!user ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.content}>
          <Header user={user} logoutHandler={logoutHandler} heading={"Your Trips ✈️"}/>
          <Gallery />
        </div>
      )}
    </div>
  );
}

export default Feed;
