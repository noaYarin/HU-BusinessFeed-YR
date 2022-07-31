import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import Wrapper from "./Layouts/Wrapper";
import Logo from "./Assests/Styles/Images/logo.png";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header
        logo={Logo}
        text="Business Feed logo"
        imageStyle="w-40 h-40 self-center pl-0"
      />
      <Wrapper />
      <Footer />
    </div>
  );
}

export default App;
