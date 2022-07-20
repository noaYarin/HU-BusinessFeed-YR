import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { Link } from "react-router-dom";
import Joi from "joi";
import validateForm from "../Services/Utils/JoiValidation";

function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState({});

  const handleSubmitForm = (e) => {
    e.preventDefault();

    return {
      userName,
      password,
    };
  };
  return (
    <div className="flex h-96 justify-center align-middle">
      <form
        onSubmit={handleSubmitForm}
        className="bg-cream w-1/3 xs:w-full sm:w-1/2 shadow-md rounded px-8 pt-6 flex-col justify-center align-middle flex"
      >
        <div className="mb-8">
          <Input
            onChange={(e) => setUserName(e.target.value)}
            text="UserName"
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            labelStyle="block text-gray-700 text-sm font-bold mb-2"
            inputStyle="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
          />
        </div>
        <div className="mb-6">
          <Input
            onChange={(e) => setPassword(e.target.value)}
            text="Password"
            type="password"
            name="password"
            id="password"
            placeholder="*****************"
            labelStyle="block text-gray-700 text-sm font-bold mb-2"
            inputStyle="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight "
          />
        </div>
        <div className="flex items-center justify-between">
          <Button
            text="Sign In"
            buttonStyle="bg-green-400 font-bold py-2 px-4 rounded "
          />
          <Link
            to="#"
            className="inline-block align-baseline font-bold text-sm text-green-300 border-b-2"
          >
            You don't have an account? Sign up here
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
