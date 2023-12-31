import {
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
import { Product } from '../../../classes/product';

@Component({
  selector: 'app-size-modal',
  templateUrl: './size-modal.component.html',
  styleUrls: ['./size-modal.component.scss'],
})
export class SizeModalComponent implements OnInit, OnDestroy {
  @Input() product: Product;

  @ViewChild('sizeChart', { static: false }) SizeChart: TemplateRef<any>;

  public closeResult: string;
  public modalOpen = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}

  openModal() {
    this.modalOpen = true;
    if (isPlatformBrowser(this.platformId)) {
      // For SSR
      this.modalService
        .open(this.SizeChart, {
          size: 'md',
          ariaLabelledBy: 'size-modal',
          centered: true,
          windowClass: 'SizeChart',
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
