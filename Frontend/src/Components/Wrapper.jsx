import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Authentication from "../Pages/Authentication";
import ContactUs from "../Pages/ContactUs";
import UserProfile from "../Pages/UserProfile";

function Wrapper() {
  return (
    <div className="mt-32 mb-32">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/userProfile" element={<UserProfile />} />
      </Routes>
    </div>
  );
}

export default Wrapper;
