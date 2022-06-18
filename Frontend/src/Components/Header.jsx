import Nav from "./Nav";
function Header() {
  return (
    <div className="w-full flex fixed top-0 left-0 align-middle justify-between h-24 bg-gray-50 p-4">
      <div>Logo</div>
      <Nav />
    </div>
  );
}

export default Header;
