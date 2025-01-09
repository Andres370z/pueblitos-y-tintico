import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './../../shared/services/auth.service';
import { NotificationsService } from './../../shared/services/notifications.service';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  test: Date = new Date();
  focus;
  focus1;
  public userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notificationsService: NotificationsService,
    private spinner: NgxSpinnerService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    
  }
  
  
  onSubmitGoogle() {
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide();
      this.authService.sendEmailVerification().then((res: any) => {
        this.notificationsService.succesNotifi('Hemos vuelto a enviar el correo')
        console.log('Succes email');
      })

    }, 5000)
  }
  onVerify(){
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide();
      this.authService.reload()
    }, 5000)
  }

}
