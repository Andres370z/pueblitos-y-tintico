import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutMyProjectRoutingModule } from './about-my-project-routing.module';
import { AboutMyProjectComponent } from './about-my-project.component';


@NgModule({
  declarations: [AboutMyProjectComponent],
  imports: [
    CommonModule,
    AboutMyProjectRoutingModule
  ]
})
export class AboutMyProjectModule { }
