import { getRandomArrayElement } from '../utils';

const offers = [
  {
    title: 'Order Uber',
    price: 20,
  },
  {
    title: 'Add luggage',
    price: 50,
  },
  {
    title: 'Switch to comfort',
    price: 80,
  },
  {
    title: 'Rent a car',
    price: 200,
  },
  {
    title: 'Add breakfast',
    price: 50,
  },
  {
    title: 'Book tickets',
    price: 40,
  },
  {
    title: 'Lunch in city',
    price: 30,
  },
];

const typePoint = [
  {
    type: 'Taxi',
    img: './img/icons/taxi.png',
    price: 20,
  },
  {
    type: 'Bus',
    img: './img/icons/bus.png',
    price: 10,
  },
  {
    type: 'Train',
    img: './img/icons/train.png',
    price: 15,
  },
  {
    type: 'Ship',
    img: './img/icons/ship.png',
    price: 120,
  },
  {
    type: 'Drive',
    img: './img/icons/drive.png',
    price: 160,
  },
  {
    type: 'Flight',
    img: './img/icons/flight.png',
    price: 160,
  },
  {
    type: 'Check-in',
    img: './img/icons/check-in.png',
    price: 600,
  },
  {
    type: 'Sightseeing',
    img: './img/icons/sightseeing.png',
    price: 50,
  },
  {
    type: 'Restaurant',
    img: './img/icons/restaurant.png',
    price: 200,
  },
];

const destination = [
  {
    title: 'Chamonix',
    description: 'Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it\'s renowned for its skiing.',
    photo: [],
  },
  {
    title: 'Amsterdam',
    description: 'Amsterdam fans out south from the Amsterdam Centraal station and Damrak, the main street off the station. The oldest area of the town is known as De Wallen (English: "The Quays"). It lies to the east of Damrak and contains the city\'s famous red-light district. To the south of De Wallen is the old Jewish quarter of Waterlooplein.',
    photo: [],
  },
  {
    title: 'Geneva',
    description: 'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
    photo: ['img/photos/1.jpg', 'img/photos/2.jpg', 'img/photos/3.jpg', 'img/photos/4.jpg', 'img/photos/5.jpg',],
  },
];


const mockEvents = [
  {
    title: `${typePoint[0].type}  ${destination[1].title}`,
    icon: `${typePoint[0].img}`,
    price: typePoint[0].price,
    eventStartTime: new Date('2019-03-18T10:30'),
    eventEndtTime: new Date('2019-03-18T11:00'),
    offers: [offers[0],],
    isFavorite: true,
  },
  {
    title: `${typePoint[5].type} ${destination[0].title}`,
    icon: `${typePoint[5].img}`,
    price: typePoint[5].price,
    eventStartTime: new Date('2019-03-18T12:25'),
    eventEndtTime: new Date('2019-03-18T13:35'),
    offers: [offers[1], offers[2],],
    isFavorite: false,
  },
  {
    title: `${typePoint[4].type} ${destination[0].title}`,
    icon: `${typePoint[4].img}`,
    price: typePoint[4].price,
    eventStartTime: new Date('2019-03-18T14:30'),
    eventEndtTime: new Date('2019-03-18T16:05'),
    offers: [offers[3],],
    isFavorite: true,
  },
  {
    title: `${typePoint[6].type} ${destination[0].title}`,
    icon: `${typePoint[6].img}`,
    price: typePoint[6].price,
    eventStartTime: new Date('2019-03-18T10:30'),
    eventEndtTime: new Date('2019-03-18T11:00'),
    offers: [offers[0],],
    isFavorite: true,
  },
];

/**
 * Returns a random event from mockEvents array.
 * @returns {Object} - Random event.
 */
function getRandomEvent() {
  return getRandomArrayElement(mockEvents);
}


export {getRandomEvent};
