import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesComponent } from './sales/sales.component';

const routes: Routes = [
  { path: '', redirectTo: '/sales', pathMatch: 'full' },
  { path: 'sales', component: SalesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
