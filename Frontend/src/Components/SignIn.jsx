import { useState } from "react";
import { useAuth } from "../Context/authContext";
import { JoiValidation } from "../Services/Utils/Validation";
import { Link, useNavigate } from "react-router-dom";
import Joi from "joi";
import Input from "./Input";
import Button from "./Button";
import Title from "./Title";

function SignIn({ redirect }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState({});
  const { userSignIn } = useAuth();
  const navigate = useNavigate();

  const baseStyle = {
    input:
      "shadow-inner appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight",
    errMsg: " text-green-300",
  };

  const schema = {
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .label("Email"),
    password: Joi.string()
      .required()
      .pattern(new RegExp(`[a-zA-Z0-9]{9}`))
      .label("Password"),
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const validationErrors = JoiValidation(schema, { email, password });
    if (!validationErrors) {
      try {
        userSignIn({ email, password });
        navigate(redirect);
      } catch (response) {
        setErrors({ dbErr: response.data });
      }
    } else {
      setErrors(validationErrors);
    }
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
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            inputStyle={baseStyle.input}
          />
          <p className={baseStyle.errMsg}>{error.userName}</p>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            inputStyle={baseStyle.input}
          />
          <p className={baseStyle.errMsg}>{error.password}</p>
          <Button
            text="Sign In"
            buttonStyle="bg-green-300 font-bold py-2 px-4 rounded"
          />
          <p className="text-center text-green-200 mt-2">{error.dbErr}</p>
        </div>
        <p className=" font-bold text-sm text-green-300 text-center">
          Don't have account?{" "}
          <Link to="/signUp" className="border-b-2">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
