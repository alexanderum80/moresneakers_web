import * as moment from 'moment-timezone';
import { Offer } from '../../home/models/offer.model';
import {
  ReleaseSameReleaseGroup,
  ReleaseShopOfferGroup,
} from '../../home/models/release.model';
import { Shop } from '../../home/models/shop.model';
import Diff = moment.unitOfTime.Diff;

export const getTimeZone = (timeZone: string): string => {
  if (timeZone === 'EMPTY') {
    return 'CET';
  }
  switch (timeZone) {
    case 'ET':
      return 'America/New_York';
    case 'BST':
      return 'Europe/London';
    default:
      return timeZone;
  }
};

export const getSameWeekThanNow = (time, timeZone): boolean => {
  const tz = getTimeZone(timeZone);
  const nowTz = moment.tz(tz);
  const nowDate = nowTz.utc();
  const raffleEndTime = moment(time).tz(tz).utc();
  return nowDate.isSame(raffleEndTime, 'isoWeek');
};

export const getDiffFromDate = (time, timeZone, unit: Diff = 's'): number => {
  const tz = getTimeZone(timeZone);
  const nowTz = moment.tz(tz);
  const utcOffset = nowTz.utcOffset() * 60;
  const nowDate = nowTz.utc();
  const raffleEndTime = moment(time).tz(tz).utc();
  return nowDate.diff(raffleEndTime, unit) + utcOffset;
};

export const isReleased = (offer): boolean => {
  if (offer.releaseTime) {
    return getDiffFromDate(offer.releaseTime, offer.timezone) > 0;
  }
  return false;
};

export const isRaffleEnded = (offer): boolean => {
  if (offer.raffleEnd) {
    return getDiffFromDate(offer.raffleEnd, offer.timezone) > 0;
  }
  return false;
};

export const getReleaseDate = (offer): string => {
  const timeZone = offer?.timezone !== 'EMPTY' ? offer?.timezone : 'CET';
  return (
    moment.utc(offer.releaseTime).format('ddd, MMM D YYYY hh:mm A') +
    ' ' +
    timeZone
  );
};

export const getRaffleEndDate = (offer): string => {
  const timeZone = offer?.timezone !== 'EMPTY' ? offer?.timezone : 'CET';
  return (
    moment.utc(offer.raffleEnd).format('ddd, MMM D YYYY hh:mm A') +
    ' ' +
    timeZone
  );
};

export const changeUrlToHttps = (url): string =>
  url?.startsWith('http://') ? url?.replace('http://', 'https://') : url;

export const getShopLogo = (shop?: Shop) => {
  let shopLogo = 'assets/images/shop-default-logo.jpg';
  if (shop) {
    if (shop.smallImage) {
      shopLogo = shop.smallImage;
    } else if (shop.mainImage) {
      shopLogo = shop.mainImage;
    }
  }
  return changeUrlToHttps(shopLogo);
};

export const groupByParentShopDrop = (offers: Offer[]): Offer[] => {
  const releaseGroups: ReleaseSameReleaseGroup[] = [];
  offers.forEach(offer => {
    const releaseGroup = releaseGroups.find(
      e => e.release === offer.release.name
    );
    if (!releaseGroup) {
      releaseGroups.push({
        release: offer.release.name,
        offers: [offer],
        groups: [],
      });
    } else {
      releaseGroup.offers.push(offer);
    }
  });

  releaseGroups.forEach(releaseGroup => {
    releaseGroup.groups = groupByParentShop(releaseGroup.offers);
  });

  const result = [];
  releaseGroups
    .map(releaseGroup => releaseGroup.groups)
    .forEach(offerGroups =>
      offerGroups.forEach(offerGroup => result.push(...offerGroup.offers))
    );
  return result;
};

export const groupByParentShop = (
  offers: Offer[],
  sortByRegion = true
): ReleaseShopOfferGroup[] => {
  const grouped: ReleaseShopOfferGroup[] = [];

  offers.forEach(offer => {
    const parent = offer.shop?.parentShop;
    if (!offer.shop || (offer.shop && offer.shop.active === true)) {
      if (parent) {
        let selectedShop = grouped.find(
          e =>
            e.shopId === parent.id &&
            e.showOnRegion === offer?.shop?.showOnRegion &&
            e.isRaffle === offer?.raffle
        );
        if (!selectedShop) {
          selectedShop = {
            shopId: parent.id,
            shopName: parent.name,
            showOnRegion: offer.shop.showOnRegion,
            region: offer.raffle ? 'raffle' : 'first come first serve',
            isRaffle: !!offer.raffle,
            rank: parent.rank,
            status: offer.status,
            logo: getShopLogo(parent),
            offers: [],
          };
          grouped.push(selectedShop);
        }
        selectedShop.offers.push(offer);
        const rank = selectedShop.rank;
        if (rank === null || rank > offer.shop.rank) {
          selectedShop.rank = offer.shop.rank;
        }
      } else {
        grouped.push({
          shopId: offer.shop?.id,
          shopName: offer.shop?.name,
          showOnRegion: offer.shop?.showOnRegion,
          region: offer.raffle ? 'raffle' : 'first come first serve',
          isRaffle: !!offer.raffle,
          rank: offer.shop?.rank,
          status: offer.status,
          logo: getShopLogo(offer.shop),
          offers: [offer],
        });
      }
    }
  });

  grouped.forEach((r: ReleaseShopOfferGroup) => {
    if (r.offers.length > 0) {
      r.offers.sort((a, b) => {
        if (a.shop.rank > b.shop.rank) {
          return 1;
        }
        if (a.shop.rank < b.shop.rank) {
          return -1;
        }
        return 0;
      });
    }
  });

  grouped.sort((a, b) => {
    if (a.rank > b.rank) {
      return 1;
    }
    if (a.rank < b.rank) {
      return -1;
    }
    return 0;
  });
  const groupedByRank = sortOfferByRank(grouped);
  return sortByRegion ? sortOfferByRegion(groupedByRank) : groupedByRank;
};

export const sortOfferByRegion = (items: ReleaseShopOfferGroup[]) => {
  return items.sort((a, b) => {
    if (getValueForSort(a.region) >= getValueForSort(b.region)) {
      return 1;
    }
    if (getValueForSort(a.region) <= getValueForSort(b.region)) {
      return -1;
    }
    return 0;
  });
};

export const sortOfferByRank = (items: ReleaseShopOfferGroup[]) => {
  return items.sort((a, b) => {
    if (getValueForSort(a.status) > getValueForSort(b.status)) {
      return 1;
    }
    if (getValueForSort(a.status) < getValueForSort(b.status)) {
      return -1;
    }
    return 0;
  });
};

export const getValueForSort = (value): number => {
  let values;
  switch (value) {
    case 'restock':
      values = 0;
      break;
    case 'available':
      values = 0;
      break;
    case 'on_sale':
      values = 0;
      break;
    case 'live':
      values = 0;
      break;
    case 'Europe':
      values = 0;
      break;
    case 'coming_soon':
      values = 1;
      break;
    case 'USA':
      values = 1;
      break;
    case 'sold_out':
      values = 2;
      break;
    case 'closed':
      values = 2;
      break;
    case 'RestOfTheWord':
      values = 1.3;
      break;
    case 'Marketplaces':
      values = 1.5;
      break;
  }
  return values;
};

export const getStatus = (status: string) => {
  switch (status) {
    case 'available':
      return 'Available';
    case 'on_sale':
      return 'On Sale';
    case 'restock':
      return 'Restock';
    case 'sold_out':
      return 'Sold Out';
    case 'coming_soon':
      return 'Coming Soon';
    case 'resell_only':
      return 'Resell Only';
    case 'live':
      return 'Live';
    case 'closed':
      return 'Closed';
    default:
      return status;
  }
};
