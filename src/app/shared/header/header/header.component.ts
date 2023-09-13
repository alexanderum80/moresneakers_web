import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  HostListener,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  // The images for the headers are in folder called assets/images/headers
  @Input() imageSrc: string;
  @Input() imageMovilSrc: string;
  @Input() label: string;
  @Input() link: string;

  src: string;
  width: number;

  constructor(@Inject(PLATFORM_ID) private platformId: string) {
    if (isPlatformBrowser(this.platformId)) {
      // Client only code.
      this.width = window.innerWidth;
    }
  }

  ngOnInit(): void {}

  // @HostListener Decorator
  @HostListener('window:resize', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      // Client only code.
      this.width = window.innerWidth;
    }
  }

  getSrc() {
    return this.width > 480 ? this.imageSrc : this.imageMovilSrc;
  }
}
