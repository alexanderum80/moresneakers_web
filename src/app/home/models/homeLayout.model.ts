import { Deal } from './deal.blog';

export interface HomeLayout {
  header?: HeaderLayout;
  heading?: HeadingLayout;
  hottest?: HottestLayout;
  deals?: DealsLayout;
  page?: string;
  slider?: SliderLayout;
  date?: string;
  success?: boolean;
  version?: string;
}

export interface DealsLayout {
  displayOnPage?: boolean;
  deals?: Array<Deal>;
}

export interface HeaderLayout {
  display: string;
  displayOnPage: boolean;
  imgUrl: string;
  imgMovil?: string;
  label: string;
  link: string;
}

export interface HeadingLayout {
  description: string;
  displayOnPage: boolean;
  keywords: string;
  pageTitle: string;
  title: string;
  imgUrl?: string;
}

export interface HottestLayout {
  display: string;
  displayOnPage: boolean;
}

export interface SliderLayout {
  display: string;
  displayOnPage: boolean;
  slides: Slider[];
}

interface Slider {
  description: string;
  entityId: string;
  entityType: string;
  imgUrl: string;
}
