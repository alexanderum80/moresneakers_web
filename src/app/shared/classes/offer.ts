import { Shop } from 'src/app/home/models/shop.model';
import { Link } from './link';

export interface Offer {
  id: string;
  brandImage?: string;
  brandName?: string;
  mainImage?: string;
  name?: string;
  sku?: string;
  status?: string;
  price?: string;
  showOnRegion?: string;
  links?: Link[];
  style?: string;
  shop?: Shop;
  rank?: number;
}

export const FAKE_OFFER: Offer = {
  id: 'sdfbvdjhfgb',
  brandImage: 'src/assets/images/test/adidas.png',
  brandName: 'Adidas',
  mainImage: 'src/assets/images/test/sneakers.png',
  name: 'Converse x Converse  Rubber Chuck 70 E260 Hi',
  sku: 'CV8482-100',
  status: 'Available',
  price: '€129.95',
  showOnRegion: 'Europe',
  style: 'Slam Jam',
  links: [
    {
      text: 'Get it',
      url: 'https://getit.com',
    },
    {
      text: 'France',
      url: 'https://france.com',
    },
  ],
};
