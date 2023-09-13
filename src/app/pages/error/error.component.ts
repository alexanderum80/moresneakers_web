import { Component, Inject, OnInit, Optional } from '@angular/core';
import { RESPONSE } from '@nguniversal/express-engine/tokens';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  // constructor(@Optional() @inject(RESPONSE)) { }
  constructor(@Optional() @Inject(RESPONSE) private response: any) {}

  ngOnInit(): void {
    this.response.statusCode = 404;
    this.response.statusMessage = 'Page Not Found';
  }
}
