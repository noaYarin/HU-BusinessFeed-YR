import { useState } from "react";
import { signIn } from "../Services/UsersService";
import { Link } from "react-router-dom";
import Joi from "joi";
import Input from "./Input";
import Button from "./Button";
import Title from "./Title";
// import { toast } from "react-toastify";

function SignIn() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const baseStyle = {
    input:
      "shadow-inner appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight",
    errMsg: " text-green-300",
  };

  const schema = Joi.object({
    userName: Joi.string()
      .alphanum()
      .min(2)
      .max(30)
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .pattern(new RegExp(`[a-zA-Z0-9\b{9}]`))
      .label("Password"),
  });

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const { error, value } = schema.validate(
      { userName, password },
      {
        abortEarly: false,
      }
    );

    if (!error) return null;
    const errs = {};
    for (const detail of error.details) {
      errors[detail.path[0]] = detail.message;
    }
    setErrors(errs);
  };

  return (
    <div className="flex justify-center w-full h-screen align-middle">
      <form
        onSubmit={handleSubmitForm}
        className="w-2/6 h-5/6 scroll-none bg-cream xs:w-full sm:w-1/2 md:w-2/4 shadow-md px-8 flex justify-center align-middle flex-col rounded-3xl"
      >
        <div className="flex flex-col p-6 space-y-3 mb-8">
          <Title titleStyle="self-center mb-4 text-4xl" text="Sign In" />
          <Input
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Username"
            inputStyle={baseStyle.input}
          />
          <p className={baseStyle.errMsg}>{errors.userName}</p>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            inputStyle={baseStyle.input}
          />
          <p className={baseStyle.errMsg}>{errors.password}</p>
          <Button
            text="Sign In"
            buttonStyle="bg-green-300 font-bold py-2 px-4 rounded"
          />
        </div>
        <p className=" font-bold text-sm text-green-300 text-center">
          Don't have account?{" "}
          <Link to="/signUp" className="border-b-2">
            {" "}
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
