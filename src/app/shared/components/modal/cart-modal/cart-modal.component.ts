import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../classes/product';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() product: Product;
  @Input() currency: any;

  @ViewChild('cartModal', { static: false }) CartModal: TemplateRef<any>;

  public closeResult: string;
  public modalOpen = false;
  public products: any[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private modalService: NgbModal,
    private productService: ProductService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  async openModal(product) {
    await this.productService.getProducts.subscribe(
      response => (this.products = response)
    );
    this.products = this.products.filter(
      items => items.category === product.category && items.id !== product.id
    );
    const status = await this.productService.addToCart(product);
    if (status) {
      this.modalOpen = true;
      if (isPlatformBrowser(this.platformId)) {
        // For SSR
        this.modalService
          .open(this.CartModal, {
            size: 'lg',
            ariaLabelledBy: 'Cart-Modal',
            centered: true,
            windowClass: 'theme-modal cart-modal CartModal',
          })
          .result.then(
            result => {
              `Result ${result}`;
            },
            reason => {
              this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            }
          );
      }
    }
  }

  ngOnDestroy() {
    if (this.modalOpen) {
      this.modalService.dismissAll();
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
