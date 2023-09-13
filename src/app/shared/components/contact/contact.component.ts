import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { HomeLayout } from 'src/app/home/models/homeLayout.model';
import { Release } from 'src/app/home/models/release.model';
import { LayoutService } from 'src/app/home/services/layout.service';
import { ReleasesService } from 'src/app/home/services/release.service';
import { ContactService } from '../../services/contact.service';
import {
  setMetaDescription,
  setMetaKeywords,
  setMetaTitle,
} from '../../utils/meta.utils';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit, OnDestroy {
  layout: HomeLayout;
  hottestReleases: Release[];
  subscriptions: Subscription[] = [];

  formGroup: FormGroup;

  constructor(
    public layoutService: LayoutService,
    private titleService: Title,
    private releaseService: ReleasesService,
    private metaService: Meta,
    private toastr: ToastrService,
    public contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.createFormGroup();

    this.getLayout();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  getLayout() {
    this.subscriptions.push(
      this.layoutService
        .getLayout('contact', '')
        .pipe(
          map(response => {
            this.layout = response.data;
            const { heading } = this.layout;
            this.addMetadata(heading);
            if (this.layout.hottest.displayOnPage) {
              this.getHottestReleases();
            }
          })
        )
        .subscribe()
    );
  }

  addMetadata(heading) {
    const title = heading?.pageTitle ?? heading?.title ?? '';
    setMetaTitle(
      title ? `${title} | More Sneakers` : 'Contact | More Sneakers',
      this.metaService,
      this.titleService
    );
    setMetaKeywords(heading?.keywords ?? '', this.metaService);
    setMetaDescription(heading?.description ?? '', this.metaService);

    this.metaService.updateTag({
      property: 'og:image',
      content: heading?.imgUrl ?? '',
    });
    this.metaService.updateTag({
      property: 'og:site_name',
      content: 'https://moresneakers.com',
    });
  }

  getHottestReleases() {
    const sub = this.releaseService
      .getAllHottestReleases(5)
      .pipe(
        map((response: any) => {
          this.hottestReleases = response;
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  createFormGroup() {
    this.formGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        Validators.required,
      ]),
      subject: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      captcha: new FormControl(null, [Validators.required]),
    });
  }

  submitClicked() {
    if (this.formGroup.valid) {
      const data = this.formGroup.value;
      this.sendEmail(data);
    } else {
      if (this.formGroup.get('name').value === '') {
        this.toastr.error('Please fill the field name.');
      }
      if (this.formGroup.get('email').value === '') {
        this.toastr.error('Please fill the field email.');
      }
      if (this.formGroup.get('email').errors) {
        this.toastr.error('Please check your email.');
      }
      if (this.formGroup.get('subject').value === '') {
        this.toastr.error('Please fill the field subject.');
      }
      if (
        this.formGroup.get('description').value === '' ||
        this.formGroup.get('description').value.length <= 9
      ) {
        this.toastr.error(
          'Please write a message that is at least 10 characters long'
        );
      }
      if (!this.formGroup.get('captcha').value) {
        this.toastr.error(
          'The reCAPTCHA wasn not entered correctly. Try it again.'
        );
      }
    }
  }

  sendEmail(data: any) {
    this.contactService.postSendEmail(data).subscribe(response => {
      this.toastr.success('Your email has been sent.');
    });
  }
}
