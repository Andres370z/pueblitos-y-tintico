import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './../../shared/services/auth.service';
import { NotificationsService } from './../../shared/services/notifications.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  test: Date = new Date();
  focus;
  focus1;
  public userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private notificationsService: NotificationsService,
    private spinner: NgxSpinnerService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.myForm()
    console.log('Estoy cargando el modulo de singin');
  }
  myForm() {
    this.userForm = this.fb.group({
      email: ['preuba1@gmail.com', Validators.compose([Validators.required, Validators.email, Validators.minLength(5)])],
      password: ['12345', Validators.compose([Validators.required, Validators.minLength(5)])],
      name: ['jajaj', Validators.compose([Validators.required, Validators.minLength(3)])],
    })
  }
  onSubmit(form: any) {
    if (this.userForm.valid) {
      console.log('Formulario valido');
      this.spinner.show();
      const data = {
        // firstname: form.name,
        email: form.email,
        password: form.password,
        // admin: true,
      }
      console.log('este es data ----->', data);
      this.authService.Register(form.email, form.password).then((res: any)=>{
        console.log('este es res -> ', res)
      })
      setTimeout(() => {
        this.spinner.hide();
      }, 5000)

    } else {
      if (this.userForm.controls.email.invalid) {
        this.notificationsService.errorNotifi('Error', 'El correo no es valido');
      }
      if (this.userForm.controls.password.invalid) {
        this.notificationsService.errorNotifi('Error', 'La contraseña no es valida');
      }
    }
  }
}
