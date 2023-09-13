import {HostListener, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

// Menu
export interface Menu {
  path?: string;
  title?: string;
  type?: string;
  megaMenu?: boolean;
  image?: string;
  active?: boolean;
  badge?: boolean;
  badgeText?: string;
  children?: Menu[];
}

@Injectable({
  providedIn: 'root',
})
export class NavService {
  public screenWidth: any;
  public leftMenuToggle = false;
  public mainMenuToggle = false;
  MENUITEMS: Menu[] = [
    {
      title: `what's new`,
      type: 'sub',
      active: false,
      path: '/whats-new',
      children: [
        { path: '/whats-new/available', title: 'Available Now', type: 'link' },
        { path: '/whats-new/on-sale', title: 'On Sale', type: 'link' },
        { path: '/whats-new/restock', title: 'Restocked', type: 'link' },
        { path: '/whats-new/sold-out', title: 'Sold Out', type: 'link' },
      ],
    },
    {
      title: `about to drop`,
      type: 'sub',
      active: false,
      children: [
        {
          path: '/about-to-drop/coming-soon',
          title: 'Coming Soon',
          type: 'link',
        },
        {
          path: '/about-to-drop/just-dropped',
          title: 'Just Dropped',
          type: 'link',
        },
        { path: '/about-to-drop/raffles', title: 'Raffles', type: 'link' },
      ],
    },
    {
      title: 'release calendar',
      type: 'link',
      active: false,
      path: '/release-calendar',
    },
    {
      title: `releases`,
      type: 'sub',
      active: false,
      children: [
        { path: '/releases/in-stock', title: 'In Stock', type: 'link' },
        { path: '/releases/coming-soon', title: 'Upcoming', type: 'link' },
        { path: '/releases/resell-only', title: 'Resell Only', type: 'link' },
      ],
    },
    {
      title: 'Explore',
      type: 'sub',
      active: false,
      children: [
        {
          path: '/categories',
          title: 'Categories',
          type: 'link',
        },
        {
          path: '/styles',
          title: 'Styles',
          type: 'link',
        },
        // TODO: Put if the client want to add shop menu, and remove comment in app routing module
        // {
        //   path: '/shops',
        //   title: 'Shop',
        //   type: 'link',
        // },
        {
          path: '/brands',
          title: 'Brands',
          type: 'link',
        },
        {
          path: '/deals',
          title: 'Deals',
          type: 'link',
        },
      ],
    },
    {
      title: 'BLOG',
      type: 'link',
      active: false,
      path: '/blog',
    },
  ];
  LEFTMENUITEMS: Menu[] = [
    {
      title: 'clothing',
      type: 'sub',
      megaMenu: true,
      active: false,
      children: [
        {
          title: 'mens fashion',
          type: 'link',
          active: false,
          children: [
            { path: '/home/fashion', title: 'sports wear', type: 'link' },
            { path: '/home/fashion', title: 'top', type: 'link' },
            { path: '/home/fashion', title: 'bottom', type: 'link' },
            { path: '/home/fashion', title: 'ethic wear', type: 'link' },
            { path: '/home/fashion', title: 'sports wear', type: 'link' },
            { path: '/home/fashion', title: 'shirts', type: 'link' },
            { path: '/home/fashion', title: 'bottom', type: 'link' },
            { path: '/home/fashion', title: 'ethic wear', type: 'link' },
            { path: '/home/fashion', title: 'sports wear', type: 'link' },
          ],
        },
        {
          title: 'women fashion',
          type: 'link',
          active: false,
          children: [
            { path: '/home/fashion', title: 'dresses', type: 'link' },
            { path: '/home/fashion', title: 'skirts', type: 'link' },
            { path: '/home/fashion', title: 'westarn wear', type: 'link' },
            { path: '/home/fashion', title: 'ethic wear', type: 'link' },
            { path: '/home/fashion', title: 'bottom', type: 'link' },
            { path: '/home/fashion', title: 'ethic wear', type: 'link' },
            { path: '/home/fashion', title: 'sports wear', type: 'link' },
            { path: '/home/fashion', title: 'sports wear', type: 'link' },
            { path: '/home/fashion', title: 'bottom wear', type: 'link' },
          ],
        },
      ],
    },
    {
      title: 'bags',
      type: 'sub',
      active: false,
      children: [
        { path: '/home/fashion', title: 'shopper bags', type: 'link' },
        { path: '/home/fashion', title: 'laptop bags', type: 'link' },
        { path: '/home/fashion', title: 'clutches', type: 'link' },
        {
          path: '/home/fashion',
          title: 'purses',
          type: 'link',
          active: false,
          children: [
            { path: '/home/fashion', title: 'purses', type: 'link' },
            { path: '/home/fashion', title: 'wallets', type: 'link' },
            { path: '/home/fashion', title: 'leathers', type: 'link' },
            { path: '/home/fashion', title: 'satchels', type: 'link' },
          ],
        },
      ],
    },
    {
      title: 'footwear',
      type: 'sub',
      active: false,
      children: [
        { path: '/home/fashion', title: 'sport shoes', type: 'link' },
        { path: '/home/fashion', title: 'formal shoes', type: 'link' },
        { path: '/home/fashion', title: 'casual shoes', type: 'link' },
      ],
    },
    {
      path: '/home/fashion',
      title: 'watches',
      type: 'link',
    },
    {
      title: 'Accessories',
      type: 'sub',
      active: false,
      children: [
        { path: '/home/fashion', title: 'fashion jewellery', type: 'link' },
        { path: '/home/fashion', title: 'caps and hats', type: 'link' },
        { path: '/home/fashion', title: 'precious jewellery', type: 'link' },
        {
          path: '/home/fashion',
          title: 'more..',
          type: 'link',
          active: false,
          children: [
            { path: '/home/fashion', title: 'necklaces', type: 'link' },
            { path: '/home/fashion', title: 'earrings', type: 'link' },
            {
              path: '/home/fashion',
              title: 'rings & wrist wear',
              type: 'link',
            },
            {
              path: '/home/fashion',
              title: 'more...',
              type: 'link',
              active: false,
              children: [
                { path: '/home/fashion', title: 'ties', type: 'link' },
                { path: '/home/fashion', title: 'cufflinks', type: 'link' },
                {
                  path: '/home/fashion',
                  title: 'pockets squares',
                  type: 'link',
                },
                { path: '/home/fashion', title: 'helmets', type: 'link' },
                { path: '/home/fashion', title: 'scarves', type: 'link' },
                {
                  path: '/home/fashion',
                  title: 'more...',
                  type: 'link',
                  active: false,
                  children: [
                    {
                      path: '/home/fashion',
                      title: 'accessory gift sets',
                      type: 'link',
                    },
                    {
                      path: '/home/fashion',
                      title: 'travel accessories',
                      type: 'link',
                    },
                    {
                      path: '/home/fashion',
                      title: 'phone cases',
                      type: 'link',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: '/home/fashion',
      title: 'house of design',
      type: 'link',
    },
    {
      title: 'beauty & personal care',
      type: 'sub',
      active: false,
      children: [
        { path: '/home/fashion', title: 'makeup', type: 'link' },
        { path: '/home/fashion', title: 'skincare', type: 'link' },
        { path: '/home/fashion', title: 'premium beaty', type: 'link' },
        {
          path: '/home/fashion',
          title: 'more..',
          type: 'link',
          active: false,
          children: [
            { path: '/home/fashion', title: 'fragrances', type: 'link' },
            { path: '/home/fashion', title: 'luxury beauty', type: 'link' },
            { path: '/home/fashion', title: 'hair care', type: 'link' },
            { path: '/home/fashion', title: 'tools & brushes', type: 'link' },
          ],
        },
      ],
    },
    {
      path: '/home/fashion',
      title: 'home & decor',
      type: 'link',
    },
    {
      path: '/home/fashion',
      title: 'kitchen',
      type: 'link',
    },
  ];
  // Array
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
  leftMenuItems = new BehaviorSubject<Menu[]>(this.LEFTMENUITEMS);

  constructor() {}

  // Windows width
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }
}
