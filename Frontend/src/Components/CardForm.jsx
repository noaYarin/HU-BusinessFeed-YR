import Input from "./Input";
import React, { useState } from "react";
import Button from "./Button";
import Image from "./Image";
import "./CSS/CardForm.css";

function CardForm() {
  const [img, setImg] = useState();

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };

  return (
    <div className="flex justify-center align-middle">
      <fieldset className="flex justify-center p-3 m-3 rounded-2xl flex-col">
        <Input
          id="name"
          name="name"
          text="Business Name:"
          type="text"
          inputStyle="inputStyle"
          labelStyle="labelStyle"
        />
        <Input
          name="description"
          text="Business Description:"
          type="text"
          labelStyle="labelStyle"
          inputStyle="inputStyle"
        />
        <Input
          name="address"
          text="Business Address:"
          type="text"
          labelStyle="labelStyle"
          inputStyle="inputStyle"
        />
        <Input
          name="phone"
          text="Business Phone:"
          type="tel"
          labelStyle="labelStyle"
          inputStyle="inputStyle"
        />
        <Input
          name="image"
          text="Business Image:"
          type="file"
          onChange={onImageChange}
          accept=".gif,.jpg,.jpeg,.png,.doc,.docx"
          labelStyle="labelStyle"
          inputStyle="m-6 "
        />
        <Button buttonStyle="bg-green-300 w-22 p-2" text="Create Card" />
      </fieldset>
      <Image src={img} alt="Business Image" imageStyle="p-3 m-2 w-4/12" />
    </div>
  );
}

export default CardForm;
