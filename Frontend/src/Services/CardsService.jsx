import httpService from "./HttpService";

export const getAllCards = () => {
  return httpService.get("/cards/allCards");
};

const cardsService = {
  getAllCards,
};

export default cardsService;
