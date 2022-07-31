import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import About from "../Pages/About";
import SignIn from "../Pages/SignIn";
import ContactUs from "../Pages/ContactUs";
import UserProfile from "../Pages/UserProfile";
import CardForm from "../Components/CardForm";
import SignUp from "../Components/SignUp";

function Wrapper() {
  return (
    <div className="flex flex-grow m-16 justify-center align-middle">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="signIn" element={<SignIn />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="contactUs" element={<ContactUs />} />
        <Route path="userProfile" element={<UserProfile />} />
        <Route path="createCard" element={<CardForm />} />
      </Routes>
    </div>
  );
}

export default Wrapper;
