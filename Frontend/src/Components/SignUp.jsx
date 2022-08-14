import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { JoiValidation } from "../Services/Utils/Validation";
import { useAuth } from "../Context/authContext";
import Joi from "joi";
import Input from "./Input";
import Button from "./Button";
import Title from "./Title";

function SignUp({ redirect }) {
  const navigate = useNavigate();
  const { createUser } = useAuth();
  const [formValues, setFormValues] = useState({
    userName: "",
    password: "",
    email: "",
    isBusiness: false,
  });
  const [error, setErrors] = useState({});
  const [dbErr, setDbErr] = useState("");

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
          .pattern(new RegExp(`[a-zA-Z0-9]{9}`))
          .required()
          .label("Password"),
        isBusiness: Joi.boolean().default(false),
      },
      copiedValues
    );

    if (!validationErrors) {
      try {
        createUser(copiedValues);
        navigate(redirect);
      } catch ({ response }) {
        setDbErr(response.data);
      }
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
        <div className="flex flex-col p-6 space-y-3 mb-8 ">
          <Title titleStyle="self-center mb-4 text-4xl" text="Sign Up" />
          <Input
            type="text"
            placeholder="Username"
            inputStyle={baseStyle.input}
            onChange={handleChange("userName")}
          />
          <p className={baseStyle.errMsg}>{error.userName}</p>
          <Input
            type="text"
            placeholder="Email"
            inputStyle={baseStyle.input}
            onChange={handleChange("email")}
          />
          <p className={baseStyle.errMsg}>{error.email}</p>
          <Input
            type="password"
            placeholder="Password"
            inputStyle={baseStyle.input}
            onChange={handleChange("password")}
          />
          <p className={baseStyle.errMsg}>{error.password}</p>
          <div className="flex justify-evenly w-32">
            <p> Is Business ?</p>
            <Input type="checkbox" onChange={handleChange("isBusiness")} />
          </div>
          <Button
            text="Sign Up"
            buttonStyle="bg-green-300 font-bold py-2 px-4 rounded hover:drop-shadow-2xl"
          />
          <p className="text-center text-green-200 mt-2">{dbErr}</p>
        </div>
        <p className=" font-bold text-sm text-green-300 text-center">
          Already have account?{" "}
          <Link to="/signIn" className="border-b-2">
            {" "}
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
