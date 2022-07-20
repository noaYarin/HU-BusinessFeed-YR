import "../Assests/Styles/CardForm.css";
import React, { useState } from "react";
import { useFormik } from "formik";
import Joi from "joi";
import { validateForm } from "../Services/Utils/JoiValidation";
import Button from "./Button";
import Image from "./Image";
import Input from "./Input";

function CardForm() {
  const [img, setImg] = useState("");

  const formik = useFormik({
    initialValues: {
      bizName: "",
      bizDesc: "",
      bizAddr: "",
      bizPhone: "",
      bizImageUrl: "",
    },
    validate: validateForm({
      bizName: Joi.string().min(2).max(30).required().label("Name"),
      bizDesc: Joi.string().min(10).max(50).required().label("Description"),
      bizAddr: Joi.string().min(6).max(30).required().label("Adress"),
      bizPhone: Joi.string().min(2).max(30).required().label("Phone"),
      bizImageUrl: Joi.string().min(10).uri().allow(""),
    }),
    onSubmit: (values) => {
      JSON.stringify(values, null, 2);
    },
  });

  return (
    <div className="flex justify-center align-middle xs:flex-col">
      <form
        className="flex justify-center p-3 m-4 flex-col "
        onSubmit={formik.handleSubmit}
      >
        <Input
          id="bizName"
          name="bizName"
          text="Business Name:"
          type="text"
          inputStyle="inputStyle"
          labelStyle="labelStyle"
          {...formik.getFieldProps("bizName")}
        />
        {formik.touched.bizName && formik.errors.bizName}
        <Input
          id="bizDesc"
          name="description"
          text="Business Description:"
          type="text"
          labelStyle="labelStyle"
          inputStyle="inputStyle"
          {...formik.getFieldProps("bizDesc")}
        />
        {formik.touched.bizDesc && formik.errors.bizDesc}
        <Input
          id="bizAddr"
          name="address"
          text="Business Address:"
          type="text"
          labelStyle="labelStyle"
          inputStyle="inputStyle"
          {...formik.getFieldProps("bizAddr")}
        />
        {formik.touched.bizAddr && formik.errors.bizAddr}
        <Input
          id="bizPhone"
          name="phone"
          text="Business Phone:"
          type="tel"
          labelStyle="labelStyle"
          inputStyle="inputStyle"
          {...formik.getFieldProps("bizPhone")}
        />
        {formik.touched.bizPhone && formik.errors.bizPhone}
        <Input
          id="bizImageUrl"
          name="image"
          text="Business Image:"
          type="url"
          labelStyle="labelStyle"
          inputStyle="inputStyle"
          {...formik.getFieldProps("bizImageUrl")}
          // onChange={() => setImg(formik.values.bizImageUrl)}
        />
        {formik.touched.bizImageUrl && formik.errors.bizImageUrl}
        <Button
          disabled={!formik.isValid}
          buttonStyle="bg-green-300 w-22 p-2"
          text="Create Card"
          type="submit"
        />
      </form>
      <Image
        src={img}
        alt="Business Image"
        imageStyle={`p-3 m-2 w-4/12 ${!img ? "hidden" : null}`}
      />
    </div>
  );
}

export default CardForm;
