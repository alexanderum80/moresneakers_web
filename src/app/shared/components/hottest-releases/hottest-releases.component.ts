import { Component, Input, OnInit } from '@angular/core';
import { Release } from 'src/app/home/models/release.model';
import { changeUrlToHttps } from '../../utils/utils';

@Component({
  selector: 'app-hottest-releases',
  templateUrl: './hottest-releases.component.html',
  styleUrls: ['./hottest-releases.component.scss'],
})
export class HottestReleasesComponent implements OnInit {
  @Input() releases: Release[];

  constructor() {}

  ngOnInit(): void {}

  urlToHttps = url => changeUrlToHttps(url);
}
