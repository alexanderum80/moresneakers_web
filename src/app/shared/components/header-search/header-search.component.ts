import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss'],
})
export class HeaderSearchComponent implements OnInit {
  @Input() imageUrl: string;
  @Input() title = 'Keep track over your favorite sneakers';
  searchTerm: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToSearchReleases() {
    if (this.searchTerm) {
      this.router.navigate(['releases/search'], {
        queryParams: { releaseName: this.searchTerm },
      });
    }
  }
}
