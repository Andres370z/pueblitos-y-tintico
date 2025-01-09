import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from './../../shared/services/auth.service';
import { SecureInnerPageGuard } from './../../shared/guard/secure-inner-page.guard';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [SecureInnerPageGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
