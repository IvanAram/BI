import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesComponent } from './sales/sales.component';
import { RecomendationsComponent } from './recomendations/recomendations.component';

const routes: Routes = [
  { path: '', redirectTo: '/ventas', pathMatch: 'full' },
  { path: 'ventas', component: SalesComponent },
  { path: 'recomendaciones', component: RecomendationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
