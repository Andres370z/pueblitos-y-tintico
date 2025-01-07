import { Injectable, NgZone } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from 'firebase/auth';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  UserData: any;
  constructor(
    private auth: Auth,
  ) { }

  errorNotifi(title: string, info: string) {
    Swal.fire({
      icon: "error",
      title: title,
      text: info,
    });
  }
  
}
