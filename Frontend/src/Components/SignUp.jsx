import { useState } from "react";
import { Link } from "react-router-dom";
import { JoiValidation } from "../Services/Utils/JoiValidation";
import { signUp } from "../Services/UsersService";
import Joi from "joi";
import Input from "./Input";
import Button from "./Button";
import Title from "./Title";

function SignUp() {
  const [formValues, setFormValues] = useState({
    userName: "",
    password: "",
    email: "",
    isBusiness: false,
  });
  const [errs, setErrors] = useState({});
  const [error, setError] = useState("");

  const handleChange = (name) => {
    return (e) => {
      if (name === "isBusiness") {
        setFormValues((values) => ({
          ...values,
          [name]: e.target.checked,
        }));
      } else {
        setFormValues((values) => ({
          ...values,
          [name]: e.target.value,
        }));
      }
    };
  };

  const submitForm = (e) => {
    e.preventDefault();
    const copiedValues = { ...formValues };
    const validationErrors = JoiValidation(
      {
        userName: Joi.string()
          .alphanum()
          .min(2)
          .max(30)
          .required()
          .label("Username"),
        email: Joi.string()
          .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
          })
          .label("Email"),
        password: Joi.string()
          .required()
          .pattern(new RegExp(`[a-zA-Z0-9\b{9}]`))
          .label("Password"),
        isBusiness: Joi.boolean().default(false),
      },
      copiedValues
    );

    if (!validationErrors) {
      signUp(copiedValues)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    } else {
      setErrors(validationErrors);
    }
  };

  const baseStyle = {
    input:
      "shadow-inner appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight",
    errMsg: " text-green-300",
  };

  return (
    <div className="flex justify-center w-full h-screen align-middle">
      <form
        className="w-2/6 h-full scroll-none bg-cream xs:w-full sm:w-2/3 md:w-2/4 shadow-md px-8 flex justify-center align-middle flex-col rounded-3xl"
        onSubmit={submitForm}
      >
        <div className="flex flex-col p-6 space-y-3 mb-8">
          <Title titleStyle="self-center mb-4 text-4xl" text="Sign Up" />
          <Input
            type="text"
            placeholder="Username"
            inputStyle={baseStyle.input}
            onChange={handleChange("userName")}
          />
          <p className={baseStyle.errMsg}>{errs.userName}</p>
          <Input
            type="text"
            placeholder="Email"
            inputStyle={baseStyle.input}
            onChange={handleChange("email")}
          />
          <p className={baseStyle.errMsg}>{errs.email}</p>
          <Input
            type="password"
            placeholder="Password"
            inputStyle={baseStyle.input}
            onChange={handleChange("password")}
          />
          <p className={baseStyle.errMsg}>{errs.password}</p>
          <div className="flex justify-evenly w-32">
            <p> Is Business ?</p>
            <Input type="checkbox" onChange={handleChange("isBusiness")} />
          </div>
          <Button
            text="Sign Up"
            buttonStyle="bg-green-300 font-bold py-2 px-4 rounded"
          />
        </div>
        <p className=" font-bold text-sm text-green-300 text-center">
          Already have account?{" "}
          <Link to="/signIn" className="border-b-2">
            {" "}
            Sign In
          </Link>
        </p>
        <p>{error}</p>
      </form>
    </div>
  );
}

export default SignUp;
