import { filter } from '../utils/filter.js';

function generateFilter() {
  return Object.entries(filter).map(([filterType]) => ({type: filterType}));
}

export { generateFilter };
