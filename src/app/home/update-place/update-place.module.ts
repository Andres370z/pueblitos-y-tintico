import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdatePlaceRoutingModule } from './update-place-routing.module';
import { UpdatePlaceComponent } from './update-place.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UpdatePlaceComponent],
  imports: [
    CommonModule,
    UpdatePlaceRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UpdatePlaceModule { }
