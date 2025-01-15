import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatePlaceComponent } from './update-place.component';

const routes: Routes = [{path: '', component: UpdatePlaceComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdatePlaceRoutingModule { }
