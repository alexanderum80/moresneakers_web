import { Component, Input, OnInit } from '@angular/core';
import { Release } from 'src/app/home/models/release.model';

@Component({
  selector: 'app-more-upcoming-releases',
  templateUrl: './more-upcoming-releases.component.html',
  styleUrls: ['./more-upcoming-releases.component.scss'],
})
export class MoreUpcomingReleasesComponent implements OnInit {
  @Input() releases: Release[];

  constructor() {}

  ngOnInit(): void {}
}
