import Nav from "../Components/Nav";
import Image from "../Components/Image";
function Header({ logo, text, imageStyle }) {
  return (
    <div className=" w-full flex align-middle justify-between h-24 bg-green-200">
      <Image src={logo} alt={text} imageStyle={imageStyle} />
      <Nav />
    </div>
  );
}

export default Header;
