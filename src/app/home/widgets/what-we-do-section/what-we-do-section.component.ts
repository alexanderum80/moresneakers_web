import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Sneaker } from '../../models/sneaker.model';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-what-we-do-section',
  templateUrl: './what-we-do-section.component.html',
  styleUrls: ['./what-we-do-section.component.scss'],
})
export class WhatWeDoSectionComponent implements OnInit {
  @Input() sneakers: Array<Sneaker>;

  whatWeDo: string;

  constructor(public layoutService: LayoutService) {}

  ngOnInit(): void {
    this.layoutService
      .getLayout('home', '')
      .pipe(
        map(response => {
          this.whatWeDo = response.data.whatWeDo.whatWeDo;
        })
      )
      .subscribe();

    // this.subscriptions.push(sub);
  }
}
