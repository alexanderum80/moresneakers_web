import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../classes/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  @ViewChild('searchField') searchField;

  public products: Product[] = [];
  public search = false;

  searchTerm: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private translate: TranslateService,
    public productService: ProductService,
    private router: Router
  ) {
    this.productService.cartItems.subscribe(
      response => (this.products = response)
    );
  }

  get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  ngOnInit(): void {}

  searchToggle() {
    this.search = !this.search;
    if (this.search) {
      setTimeout(() => {
        this.searchField.nativeElement.focus();
      }, 100);
    }
  }

  changeLanguage(code) {
    if (isPlatformBrowser(this.platformId)) {
      this.translate.use(code);
    }
  }

  removeItem(product: any) {
    this.productService.removeCartItem(product);
  }

  changeCurrency(currency: any) {
    this.productService.Currency = currency;
  }

  navigateToSearchReleases() {
    if (this.searchTerm && this.search === true) {
      this.searchToggle();
      void this.router.navigate(['releases/search'], {
        queryParams: { releaseName: this.searchTerm },
      });
    }
  }
}
