import { Meta, Title } from '@angular/platform-browser';

export const setMetaTitle = (
  title: string,
  metaService: Meta,
  titleService: Title
) => {
  titleService.setTitle(title ?? '');
  metaService.updateTag({
    property: 'og:title',
    content: title ?? '',
  });
};

export const setMetaDescription = (description: string, metaService: Meta) => {
  metaService.updateTag({
    name: 'description',
    content: description ?? '',
  });
  metaService.updateTag({
    name: 'metaDescription',
    content: description ?? '',
  });
  metaService.updateTag({
    property: 'og:description',
    content: description ?? '',
  });
};

export const setMetaKeywords = (keywords: string, metaService: Meta) => {
  metaService.updateTag({
    name: 'keywords',
    content: keywords,
  });
  metaService.updateTag({
    name: 'metaKeywords',
    content: keywords,
  });
};

export const addPageMetadata = (
  heading: any,
  description,
  metaService: Meta
) => {
  setMetaKeywords(heading?.keywords ?? '', metaService);
  setMetaDescription(description, metaService);

  metaService.updateTag({
    property: 'og:title',
    content: heading?.pageTitle ?? heading?.title ?? '',
  });
  metaService.updateTag({
    property: 'og:image',
    content: heading?.imgUrl ?? '',
  });
  metaService.updateTag({
    property: 'og:site_name',
    content: 'https://moresneakers.com',
  });
};
