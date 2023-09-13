import {
  AfterViewInit,
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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-age-verification',
  templateUrl: './age-verification.component.html',
  styleUrls: ['./age-verification.component.scss'],
})
export class AgeVerificationComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('ageVerification') AgeVerificationModal: TemplateRef<any>;

  public closeResult: string;
  public ageVerificationForm: FormGroup;
  public currdate: any;
  public setDate: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.ageVerificationForm = this.fb.group({
      day: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (localStorage.getItem('ageVerification') !== 'true') {
      this.openModal();
    }
  }

  openModal() {
    if (isPlatformBrowser(this.platformId)) {
      // For SSR
      this.modalService
        .open(this.AgeVerificationModal, {
          size: 'md',
          backdrop: 'static',
          keyboard: false,
          centered: true,
          windowClass: 'bd-example-modal-md theme-modal agem',
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

  ageForm() {
    const day = this.ageVerificationForm.value.day;
    const month = this.ageVerificationForm.value.month;
    const year = this.ageVerificationForm.value.year;
    const age = 18;
    const mydate = new Date();
    mydate.setFullYear(year, month - 1, day);

    this.currdate = new Date();
    const setDate = new Date();
    this.setDate = setDate.setFullYear(
      mydate.getFullYear() + age,
      month - 1,
      day
    );

    if (this.currdate - this.setDate > 0) {
      localStorage.setItem('ageVerification', 'true');
      this.modalService.dismissAll();
    } else {
      window.location.href = 'https://www.google.com/';
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

  ngOnDestroy() {}
}
