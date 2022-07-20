import Button from "./Button";
import { Link } from "react-router-dom";
function CardItem({ bImg = "img", bName = "Name", bDesc = "Description" }) {
  return (
    <div className="w-80 h-2/4 rounde text-center shadow-lg m-12">
      <img src={bImg} alt={bName} className="object-cover h-48 w-full " />
      <div className="px-6 py-4 h-32 overflow-y-auto">
        <div className="font-bold text-xl mb-2 text-center ">{bName}</div>
        <p className="text-gray-700 text-base">{bDesc}</p>
      </div>
      <div className="flex justify-center align-middle p-3">
        <Link to="/cardPopup">
          <Button
            text="More Info"
            buttonStyle="max-w-sm rounded p-2 hover:scale-125 mb-3 shadow-lg bg-green-100 ease-in duration-300 "
          />
        </Link>
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
