import delay from './delay';
import type Category from '../types/category';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const categories: Category[] = [
  {
    id: 'other',
    name: 'other',
  },
  {
    id: 'dessert',
    name: 'dessert',
  },
  {
    id: 'poultry',
    name: 'poultry',
  },
  {
    id: 'vegetable',
    name: 'vegetable',
  },
  {
    id: 'beef',
    name: 'beef',
  },
];

class CategoryApi {
  static getAllCategories(): Promise<Category[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...categories]);
      }, delay);
    });
  }
}

export default CategoryApi;
