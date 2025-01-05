import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMyProjectComponent } from './about-my-project.component';

const routes: Routes = [{
  path: '', component: AboutMyProjectComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutMyProjectRoutingModule { }
