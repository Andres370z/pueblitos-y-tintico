import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../shared/services/places.service';
import { NotificationsService } from '../shared/services/notifications.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public places: any;
  public userDta: any;
  public options: Boolean = false;
  constructor(
    private spinner: NgxSpinnerService,
    private _placeService: PlacesService,
    private router: Router,
    private alertService: NotificationsService
  ) {
    if (localStorage.getItem('isLog') === 'false') {
      this.spinner.hide(); 

    } {
    }
  }

  ngOnInit(): void {
    this.userDta = JSON.parse(localStorage.getItem('user'));
    this.getPlacesDetail();
    this.spinner.hide();
  }

  getPlacesDetail() {
    this.spinner.show();
    this._placeService.getPlaces().subscribe((res: any) => {
      setTimeout(() => {
        this.spinner.hide();
      }, 5000);
      console.log('Estos son tus datos: ---->', res);
      this.places = res
    }, (error: any)=>{
      this.spinner.hide();
      this.alertService.errorNotifi('Ups', 'No logre cargar la info. Vuelve mas tarde')
    })
  }

  editPlace(place: any) {
    console.log('este es place -----> ', place);
    localStorage.setItem('place-edit', JSON.stringify(place));
    this.router.navigate(['pages/edit-place'])
  }

  deletePlace(id: string, title: string) {
    if (id) {
      console.log('este es id -----> ', id);
      Swal.fire({
        title: "Estas seguro?",
        text: `El post: ${title}, no volvera`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borra esa vaina!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.spinner.show();

          this._placeService.deletePlace(id).then((res: any) => {
            this.spinner.hide();
            console.log('desues de borrar ---> ', res);
            Swal.fire({
              title: "Eliminado!",
              text: "Nunca mas en tu vida lo veras",
              icon: "success"
            });
          })
        }
      }).catch((error) => {
        console.log(error);
        this.spinner.hide()
        this.alertService.errorNotifi('Se jodio esta vaina', 'Compae no logre eliminar, escribame al inbox')
      })
    }


    this.router.navigate(['pages'])
  }


  optionsAdmin(){
    if (this.userDta !== null) {
      return true;
    } else{
      return false
    }
  }
}
