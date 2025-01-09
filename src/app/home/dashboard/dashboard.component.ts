import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './../../shared/services/auth.service';
import { NotificationsService } from './../../shared/services/notifications.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  page = 4;
  page1 = 5;
  focus;
  focus1;
  focus2;
  date: { year: number, month: number };
  model: NgbDateStruct;
  public userForm: FormGroup;

  public userDta: any;
  constructor(
    private renderer: Renderer2,
    private fb: FormBuilder,
    private notificationsService: NotificationsService,
    private spinner: NgxSpinnerService,
    private authService: AuthService
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
      title: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      descripcion: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    })
  }
  onSubmit(form: any) {
    if (this.userForm.valid) {
      console.log('Este es form ----->',form);
      
    }else {
      console.log('Se daño', this.userForm.valid);
      
    }
  }
}
