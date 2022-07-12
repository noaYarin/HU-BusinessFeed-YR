import { Link } from "react-router-dom";
import Button from "../Components/Button";

function UserProfile() {
  return (
    <>
      <h1>User Profile</h1>
      <Link to="/createCard">
        <Button buttonStyle="bg-cream p-2" text="Create a Business Card" />
      </Link>
    </>
  );
}

export default UserProfile;
