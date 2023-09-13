import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReleaseCalendarPageComponent } from './pages/release-calendar-page/release-calendar-page.component';

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const routes: Routes = [
  {
    path: '',
    redirectTo: `${currentYear}/${currentMonth}`,
    // component: ReleaseCalendarPageComponent,
  },
  {
    path: ':year/:month',
    component: ReleaseCalendarPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReleasesCalendarRoutingModule {}
