import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';


const routes: Routes = [
  { path: '', component: HomeComponent
  },{
    path: 'login',
    loadChildren: () => import('./sign-in/sign-in.module').then(m => m.SignInModule)
  },{
    path: 'register',
    loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpModule)
  },{
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then(m => m.VerifyEmailModule)
  },{
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
