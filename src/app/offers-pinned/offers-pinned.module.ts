import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffersPinnedComponent } from './offers-pinned.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [OffersPinnedComponent],
  imports: [CommonModule, RouterModule],
  exports: [OffersPinnedComponent],
})
export class OffersPinnedModule {}
