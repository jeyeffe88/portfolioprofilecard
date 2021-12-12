import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routesHome } from './home/home-routing.module';

const routes: Routes = [
  {
    path: 'home',
    children: routesHome
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }, 
  {
    path: '**',
    redirectTo: '/home'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
