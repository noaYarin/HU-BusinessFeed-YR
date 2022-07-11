import Input from "./Input";
import React, { useState } from "react";
import { useFormik } from "formik";
import Joi from "joi";
import Button from "./Button";
import Image from "./Image";
import "./CSS/CardForm.css";

function CardForm() {
  const [img, setImg] = useState();

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };

  const validateForm = (schema) => {
    return (values) => {
      const { error } = Joi.object(schema).validate(values, {
        abortEarly: false,
      });

      if (!error) return null;

      const errors = {};
      for (const detail of error.details) {
        errors[detail.path[0]] = detail.message;
      }
      return errors;
    };
  };

  const formik = useFormik({
    initialValues: {
      bizName: "",
      bizDesc: "",
      bizAddr: "",
      bizPhone: "",
      bizImageUrl: "",
    },
    validate: validateForm({
      bizName: Joi.string().min(2).max(30).required(),
      bizDesc: Joi.string().min(10).max(50).required(),
      bizAddr: Joi.string().min(6).max(30).required(),
      bizPhone: Joi.string().min(2).max(30).required(),
      bizImageUrl: Joi.string().min(10).required(),
    }),
    onSubmit: (values) => {
      JSON.stringify(values, null, 2);
    },
  });

  return (
    <div className="flex justify-center align-middle">
      <form
        className="flex justify-center p-3 m-3 rounded-2xl flex-col"
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
          type="file"
          accept=".gif,.jpg,.jpeg,.png,.doc,.docx"
          labelStyle="labelStyle"
          inputStyle="m-6"
          onChange={onImageChange}
          {...formik.getFieldProps("bizImageUrl")}
        />
        {formik.touched.bizImageUrl && formik.errors.bizImageUrl}
        <Button
          disabled={!formik.isValid}
          buttonStyle="bg-green-300 w-22 p-2"
          text="Create Card"
          type="submit"
        />
      </form>
      <Image src={img} alt="Business Image" imageStyle="p-3 m-2 w-4/12" />
    </div>
  );
}

export default CardForm;
