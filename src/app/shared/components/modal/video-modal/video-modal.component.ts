import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.scss'],
})
export class VideoModalComponent implements OnInit, OnDestroy {
  @ViewChild('videoModal', { static: false }) VideoModal: TemplateRef<any>;

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
        .open(this.VideoModal, {
          size: 'lg',
          ariaLabelledBy: 'Video-Modal',
          centered: true,
          windowClass: 'modal fade video-modal',
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
