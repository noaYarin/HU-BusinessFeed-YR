import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Wrapper from "./Components/Wrapper";

function App() {
  return (
    <>
      <Header />
      <Wrapper />
      <Footer />
    </>
  );
}

export default App;
