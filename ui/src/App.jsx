import "./App.css";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import RouteError from "./pages/RouteError";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/feed" element={<Feed />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="*" element={<RouteError />}></Route>
      </Routes>
    </>
  );
}

export default App;
