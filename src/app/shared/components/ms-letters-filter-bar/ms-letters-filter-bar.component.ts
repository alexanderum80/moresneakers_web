import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
  ViewChildren,
} from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-ms-letters-filter-bar',
  templateUrl: './ms-letters-filter-bar.component.html',
  styleUrls: ['./ms-letters-filter-bar.component.scss'],
})
export class MsLettersFilterBarComponent implements OnInit {
  @Input() selected: string;
  @Output() onSelectedFilter = new EventEmitter();
  @ViewChildren('.letter-btn') buttons;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    this.listenButtonClick();
  }

  private listenButtonClick() {
    if (isPlatformBrowser(this.platformId)) {
      const event = fromEvent(
        document?.querySelectorAll('.letter-btn'),
        'click'
      );
      event.subscribe((evt: any) => {
        this.onSelectedFilter.emit(evt.target.innerText);
      });
    }
  }
}
