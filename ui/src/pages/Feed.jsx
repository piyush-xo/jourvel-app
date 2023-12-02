import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { logOut } from '../store/AuthSlice';
import { useNavigate } from 'react-router-dom';

function Feed() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  console.log({auth});

  const logoutHandler = () => {
    dispatch(logOut());
    navigate("/");
  }
  return (
    <div>Hi {auth.user.username}
    <button onClick={logoutHandler}>Logout</button>
    </div>
  )
}

export default Feed