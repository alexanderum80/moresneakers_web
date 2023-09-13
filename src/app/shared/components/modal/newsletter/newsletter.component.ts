import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
})
export class NewsletterComponent implements OnInit, AfterViewInit, OnDestroy {
  modal: NgbModalRef;
  @ViewChild('newsletter', { static: false }) NewsLetterModal: TemplateRef<any>;

  public closeResult: string;
  public modalOpen = false;

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: object,
    private modalService: NgbModal,
    private renderer2: Renderer2,
    @Inject(DOCUMENT) private document
  ) {}

  ngOnInit(): void {
    const s = this.renderer2.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://sibforms.com/forms/end-form/build/main.js';
    s.text = ``;
    this.renderer2.appendChild(this.document.body, s);
  }

  ngAfterViewInit(): void {
    // if(localStorage.getItem("newsletter") !== 'true')
    //    this.openModal();
    // localStorage.setItem("newsletter", 'true');
  }

  openModal() {
    if (isPlatformBrowser(this.platformId)) {
      // For SSR
      this.modalService
        .open(this.NewsLetterModal, {
          size: 'lg',
          ariaLabelledBy: 'NewsLetter-Modal',
          centered: true,
          windowClass: 'theme-modal newsletterm NewsLetterModal',
        })
        .result.then(
          result => {
            this.modalOpen = true;
            `Result ${result}`;
          },
          reason => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            this.modalService.dismissAll();
          }
        );
    }
  }

  cerrar() {
    this.modalService.dismissAll();
  }

  ngOnDestroy() {
    if (this.modalOpen) {
      this.modalService.dismissAll();
    }
  }

  submit() {
    this.modalService.dismissAll();
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
