import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  // Initialize
  constructor() {}

  changeNameToSlug(name: string) {
    return name ? name.toLowerCase().replace(/-/g, '_').replace(/ /g, '-') : '';
  }

  changeSlugToName(slug: string) {
    const result = slug ? slug.replace(/-/g, ' ').replace(/_/g, '-') : '';
    return this.toTitleCase(result);
  }

  toTitleCase(str: string) {
    return str.replace(
      /\w\S*/g,
      txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }
}
