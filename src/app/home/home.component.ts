import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../shared/services/places.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public places: any;
  constructor(
    private spinner: NgxSpinnerService,
    private _placeService: PlacesService
  ) {
    if (localStorage.getItem('isLog') === 'false') {
      this.spinner.hide();

    } {
    }
  }

  ngOnInit(): void {
    this.getPlacesDetail();
    this.spinner.hide();
  }

  getPlacesDetail() {
    this._placeService.getPlaces().subscribe((res: any) => {
      console.log('Estos son tus datos: ---->', res);
      this.places = res
    })
  }

}
