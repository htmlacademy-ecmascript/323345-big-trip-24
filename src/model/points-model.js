import {points} from '../mock/points.js';


const pointsModel = points.map((item) => (
  {
    id: item.id,
    basePrice: item.base_price,
    dateFrom: item.date_from,
    dateTo: item.date_to,
    destination: item.destination,
    isFavorite: item.is_favorite,
    offers:item.offers,
    type: item.type
  }
)
);


export {pointsModel};
