import Button from "./Button";
function CardForm() {
  const inputStyle =
    "bg-transparent border-b-2 border-green-200 inline-block text-gray-700 mr-3 py-1 px-2 focus:outline-none mb-4";

  return (
    <div className="flex justify-center align-middle">
      <fieldset className="flex justify-center p-3 m-3 rounded-2xl flex-col">
        <label for="name" className="font-bold ">
          Business Name:
        </label>
        <input name="name" type="text" className={inputStyle} />
        <label for="description" className="font-bold">
          Business Description:
        </label>
        <input name="description" type="text" className={inputStyle} />
        <label for="address" className="font-bold">
          Business Address:
        </label>
        <input name="address" type="text" className={inputStyle} />
        <label for="phone" className="font-bold">
          Business Phone:
        </label>
        <input name="phone" type="tel" className={inputStyle} />
        <label for="image" className="font-bold">
          Business Image:
        </label>
        <input name="image" type="img" className={inputStyle} />
        <Button buttonStyle="bg-green-300 w-22 p-2" text="Create Card" />
      </fieldset>
    </div>
  );
}

export default CardForm;
