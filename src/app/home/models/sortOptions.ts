export interface OptionSort {
  id?: string;
  name: string;
  sortFieldName: string;
  direction: string;
}

export const SORT_OPTIONS: OptionSort[] = [
  {
    id: 'hot',
    name: 'Hottest',
    sortFieldName: 'hot',
    direction: 'desc',
  },
  {
    id: 'createdAt',
    name: 'Latest Added',
    sortFieldName: 'createdAt',
    direction: 'desc',
  },
  {
    id: 'updatedAt',
    name: 'Latest Updated',
    sortFieldName: 'updatedAt',
    direction: 'desc',
  },
  {
    id: 'releaseDate',
    name: 'Release Date',
    sortFieldName: 'releaseDate',
    direction: 'desc',
  },
  {
    id: 'priceEUR-HL',
    name: 'Price High-Low',
    sortFieldName: 'priceEUR',
    direction: 'desc',
  },
  {
    id: 'priceEUR-LH',
    name: 'Price Low-High',
    sortFieldName: 'priceEUR',
    direction: 'asc',
  },
];

export const SORT_OPTIONS_OFFERS: OptionSort[] = [
  {
    name: 'Hottest',
    sortFieldName: 'hot',
    direction: 'desc',
  },
  {
    name: 'Latest Updated',
    sortFieldName: 'updatedAt',
    direction: 'desc',
  },
  {
    name: 'Release Time',
    sortFieldName: 'releaseTime',
    direction: 'desc',
  },
  {
    name: 'Price High-Low',
    sortFieldName: 'price',
    direction: 'desc',
  },
  {
    name: 'Price Low-High',
    sortFieldName: 'price',
    direction: 'asc',
  },
];

export const COLORS_OPTIONS = [
  { id: 'beige', name: 'Beige', color: 'beige' },
  { id: 'black', name: 'Black', color: 'black' },
  { id: 'blue', name: 'Blue', color: 'blue' },
  { id: 'bronze', name: 'Bronze', color: '#cd7f32' },
  { id: 'brown', name: 'Brown', color: 'brown' },
  { id: 'gold', name: 'Gold', color: 'gold' },
  { id: 'green', name: 'Green', color: 'green' },
  { id: 'grey', name: 'Grey', color: 'grey' },
  { id: 'maroon', name: 'Maroon', color: 'maroon' },
  { id: 'multicolor', name: 'Multicolor', color: 'multicolor' },
  { id: 'orange', name: 'Orange', color: 'orange' },
  { id: 'pink', name: 'Pink', color: 'pink' },
  { id: 'purple', name: 'Purple', color: 'purple' },
  { id: 'red', name: 'Red', color: 'red' },
  { id: 'silver', name: 'Silver', color: 'silver' },
  { id: 'violet', name: 'Violet', color: 'violet' },
  { id: 'white', name: 'White', color: 'white' },
  { id: 'yellow', name: 'Yellow', color: 'yellow' },
];

export const SIZE_OPTIONS = [
  { id: '5,5', name: '5,5' },
  { id: '6', name: '6' },
  { id: '6,5', name: '6,5' },
  { id: '7', name: '7' },
  { id: '7,5', name: '7,5' },
  { id: '8', name: '8' },
  { id: '8,5', name: '8,5' },
  { id: '9', name: '9' },
];
