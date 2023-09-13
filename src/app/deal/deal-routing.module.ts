import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DealsPageComponent} from './pages/deal-page/deals-page.component';

const routes: Routes = [
    {
        path: '',
        component: DealsPageComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DealRoutingModule {
}
