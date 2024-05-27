import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logIn, logOut } from "../store/AuthSlice";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/BaseURL";
import styles from "./Profile.module.css";
import Header from "../components/Header";
import ProfileForm from "../components/Profile/ProfileForm"

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log({ auth });

  const [user, setUser] = useState(auth.user);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async (user) => {
    const res = await fetch(`${baseUrl}/api/users/${user.id}`, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    });
    const userData = await res.json();
    console.log(userData);
    setUserData(userData);
  };

  // const updateUserData = async (userData) => {
  //   const res = await fetch(`${baseUrl}/api/users`);
  //   const respose = await res.json();
  //   console.log(res);
  // };

  const logoutHandler = () => {
    dispatch(logOut());
    localStorage.removeItem("token");
    navigate("/");
  };

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

  useEffect(() => {
    if (user) {
      fetchUserData(user);
    }
  }, [user]);

  return (
    <div className={styles.container}>
      {!user ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.content}>
          <Header
            user={user}
            logoutHandler={logoutHandler}
            heading={"YOU 🤓"}
          />
          <ProfileForm userData={userData}/>
        </div>
      )}
    </div>
  );
}

export default Profile;
