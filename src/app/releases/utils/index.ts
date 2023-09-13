import { UrlSegment } from '@angular/router';

export const releasesUrlMatcher = (segments: UrlSegment[]) => {
  if (
    segments.length > 6 ||
    segments[0].path === 'search' ||
    !['in-stock', 'coming-soon', 'resell-only'].includes(segments[0]?.path)
  ) {
    return null;
  }
  const filters = segments.slice(1).map(segment => segment.path);
  return {
    consumed: segments,
    posParams: {
      ...(filters.length
        ? {
            filters: new UrlSegment(JSON.stringify(filters), {}),
          }
        : {}),
    },
  };
};

export const releasesSlugUrlMatcher = (segments: UrlSegment[]) => {
  if (
    segments.length > 7 ||
    segments[0].path === 'search' ||
    !['in-stock', 'coming-soon', 'resell-only'].includes(segments[1]?.path)
  ) {
    return null;
  }
  const filters = segments.slice(2).map(segment => segment.path);
  return {
    consumed: segments,
    posParams: {
      slug: segments[0],
      ...(filters.length
        ? {
            filters: new UrlSegment(JSON.stringify(filters), {}),
          }
        : {}),
    },
  };
};

export const stylesUrlMatcher = (segments: UrlSegment[]) => {
  if (segments.length > 7 || segments[0].path === 'search') {
    return null;
  }
  const filters = segments.slice(1).map(segment => segment.path);
  return {
    consumed: segments,
    posParams: {
      slug: segments[0],
      ...(filters.length
        ? {
            filters: new UrlSegment(JSON.stringify(filters), {}),
          }
        : {}),
    },
  };
};
