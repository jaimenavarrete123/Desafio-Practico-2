import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component'
import { LogInComponent } from './components/log-in/log-in.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ServiciosComponent } from './components/servicios/servicios.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'log-in', component: LogInComponent },
  { path: 'home', component: HomeComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'servicios', component: ServiciosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
