import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { PlacesService } from './../../shared/services/places.service';
import { NotificationsService } from './../../shared/services/notifications.service';
import { Lugares } from './../../shared/services/places.service';
@Component({
  selector: 'app-update-place',
  templateUrl: './update-place.component.html',
  styleUrls: ['./update-place.component.scss']
})
export class UpdatePlaceComponent implements OnInit {
  page = 4;
  page1 = 5;
  focus;
  focus1;
  focus2;
  date: { year: number, month: number };
  model: NgbDateStruct;
  files: File[] = [];
  urlFinalImage: string;
  public userForm: FormGroup;
  public previewUrl: string | ArrayBuffer | null = null;
  public imageUrl: any
  public userDta: any;
  public placeDta: any;

  constructor(
    private renderer: Renderer2,
    private fb: FormBuilder,
    private notificationsService: NotificationsService,
    private spinner: NgxSpinnerService,
    private _placeService: PlacesService
  ) { }

  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled(date: NgbDateStruct, current: { month: number }) {
    return date.month !== current.month;
  }

  ngOnInit() {
    this.userDta = JSON.parse(localStorage.getItem('user'));
    this.placeDta = JSON.parse(localStorage.getItem('place-edit'));
    if (this.placeDta) {
      console.log('Ok', this.placeDta);
      this.imageUrl = this.placeDta.imagen;
      this.urlFinalImage = this.imageUrl;
    }else {
      this.notificationsService.errorNotifi('Ups', 'Parce escribame porque esto se jodio')
    }

    

    let input_group_focus = document.getElementsByClassName('form-control');
    let input_group = document.getElementsByClassName('input-group');
    for (let i = 0; i < input_group.length; i++) {
      input_group[i].children[0].addEventListener('focus', function () {
        input_group[i].classList.add('input-group-focus');
      });
      input_group[i].children[0].addEventListener('blur', function () {
        input_group[i].classList.remove('input-group-focus');
      });
    }
    this.myForm();


  }


  myForm() {
    this.userForm = this.fb.group({
      title: [this.placeDta.title , Validators.compose([Validators.required, Validators.minLength(5)])],
      descripcion: [this.placeDta.description, Validators.compose([Validators.required, Validators.minLength(5)])],
      image: [Validators.compose([Validators.required])]
    })
  }
  onSubmit(form: any) {
    if (this.userForm.valid && this.urlFinalImage) {
      console.log('Este es form ----->', form);
      try {
        const { title, descripcion } = form
        const lugar: Lugares = {
          title: title,
          description: descripcion,
          imagen: this.urlFinalImage
        }
        this._placeService.updatePlace(this.placeDta.id ,lugar).then((res: any) => {
          console.log(res);
        });
        this.notificationsService.successfulRedirects('Lugar creado', 'revisa que este en el home', 'pages')
      } catch (error) {
        console.log('error --->', error);
        this.notificationsService.errorNotifi('Ups', 'Error en el envio')
      }
    } else {
      this.notificationsService.errorNotifi('Ups', 'Revisa que todos los campos incluyendo la imagen esten completos')
      console.log('Se daño', this.userForm.valid);
    }
  }

  onSelect(event: Event) {
    this.spinner.show()
    const inputElement = event.target as HTMLInputElement;

    // Verificar si `files` está definido
    if (inputElement?.files) {
      const filesArray = Array.from(inputElement.files); // Convertir FileList a Array<File>
      this.files.push(...filesArray);
      console.log('Archivos añadidos:', this.files);

      // Previsualizar la imagen
      const file = this.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;  // Asigna la URL de la imagen para previsualizar
      };
      reader.readAsDataURL(file);
    } else {
      this.notificationsService.errorNotifi('Se jodio esta vaina', 'Compae no logre subir la imagen, escribame al inbox')
    }
    if (this.files.length === 0) return console.log('Ni entra');
    const file_data = this.files[0];
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'pueblitos-y-tintico');
    data.append('cloud_name', 'da4si8eaz');



    this._placeService.uploadImages(data).subscribe(
      {
        next: (response: any) => {
          console.log(response);
          this.urlFinalImage = response.url
          this.spinner.hide();
        },
        error: (e: any) => {
          this.spinner.hide();
          console.log('daño ', e);
          this.notificationsService.errorNotifi('Se jodio esta vaina', 'Compae no logre subir la imagen, escribame al inbox')
        }
      }
    )
    return true;
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1)
  }


}
