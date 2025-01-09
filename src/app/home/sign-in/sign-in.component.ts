import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from './../../shared/services/notifications.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './../../shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  test: Date = new Date();
  focus;
  focus1;
  public userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private notificationsService: NotificationsService,
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.spinner.hide();
    this.myForm()
    console.log('Estoy cargando el modulo de singin');
  }
  myForm() {
    this.userForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(5)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    })
  }
  onSubmit(form: any) {
    if (this.userForm.valid) {
      console.log('Formulario valido');
      this.spinner.show();
      this.authService.login(form.email, form.password).then((res: any)=>{

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
