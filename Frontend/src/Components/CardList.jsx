import CardItem from "./CardItem";
import React, { useEffect, useState } from "react";
import { getAllCards } from "../Services/CardsService";

function CardList() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    getAllCards()
      .then((cards) => setCards(cards.data))
      .catch((err) => {
        throw new Error(err.message);
      });
  }, []);

  return (
    <div className="flex flex-wrap justify-around">
      {!cards.length ? (
        <h1>No Cards Yet</h1>
      ) : (
        cards.map((cardItem) => (
          <CardItem
            key={cardItem._id}
            bName={cardItem.bName}
            bDesc={cardItem.bDesc}
            bImg={cardItem.bImageUrl}
          />
        ))
      )}
    </div>
  );
}

export default CardList;
