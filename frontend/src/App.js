import ReactApp, { useEffect } from "react";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Inbox from "./pages/inbox/Inbox";
import AddUsers from "./pages/AddUsers/AddUsers";
import Profile from "./pages/profile/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inbox />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/addUsers" element={<AddUsers />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
