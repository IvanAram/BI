import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalesComponent } from './sales/sales.component';
import { HistoricComponent } from './historic/historic.component';
import { DistributorsComponent } from './distributors/distributors.component';
import { RecomendationsComponent } from './recomendations/recomendations.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'ventas', component: SalesComponent },
  { path: 'historial', component: HistoricComponent },
  { path: 'distribuidores', component: DistributorsComponent },
  { path: 'recomendaciones', component: RecomendationsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
