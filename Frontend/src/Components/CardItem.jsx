import Button from "./Button";
function CardItem({ bImg, bName, bDesc }) {
  return (
    <div className="max-w-sm rounded shadow-lg m-12">
      <div className="max-w-sm rounded shadow-lg">
        <img src={bImg} alt={bName} className="object-cover h-48 w-full " />
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2 text-center ">{bName}</div>
          <p className="text-gray-700 text-base max-h-60 overflow-y-auto  ">
            {bDesc}
          </p>
        </div>
        <div className="flex justify-center align-middle p-3">
          <Button
            text="More Info"
            buttonStyle="max-w-sm rounded p-2 hover:scale-125 shadow-lg bg-gray-500 ease-in duration-300 "
          />
        </div>
      </div>
    </div>
  );
}

CardItem.defaultProps = {
  bImg: "https://images.pexels.com/photos/1095550/pexels-photo-1095550.jpeg?auto=compress&cs=tinysrgb&w=600",
  bName: "Tory",
  bDesc:
    "   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam nulla dolorem nemo quam a. Unde placeat, necessitatibus asperiores consequuntur facere sequi reiciendis accusamus odit facilis, dolores amet iusto, quam quidem Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam nulla dolorem nemo quam a. Unde placeat, necessitatibus asperiores consequuntur facere sequi reiciendis accusamus odit facilis, dolores amet iusto, quam quidem?",
};

export default CardItem;
