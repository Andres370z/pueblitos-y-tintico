import { Injectable, NgZone } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  User,
  updateProfile
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NotificationsService } from './../services/notifications.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  UserData: any;

  constructor(
    private auth: Auth,
    public ngZone: NgZone,
    private alertServices: NotificationsService,
    private router: Router
  ) {
    /**
     * Escucha los cambios en el estado de autenticación del usuario. 
     * Si el usuario inicia sesión o cierra sesión, se ejecuta esta función. Este metodo es original de AngularFire
     * si el usuario esta autenticado Guarda los datos del usuario (user) 
     * en el atributo UserData y los almacena en el localStorage. Sì no esta autenticado lo que hace limpiar el local 
     */
    onAuthStateChanged(this.auth, (user: any) => {
      if (user) {
        this.UserData = user;
        localStorage.setItem('user', JSON.stringify(this.UserData));
        localStorage.setItem('isLog', 'true')
        JSON.parse(localStorage.getItem('user')!)
      } else {
        localStorage.setItem('isLog', 'false')
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });

  }

  getAutfire() {
    return this.auth.currentUser;
  }
  /**Para devolver el usuario de localstorage */
  getAuthLocal() {
    const token = localStorage.getItem('user');
    const user = JSON.parse(token as string);
    return user;
  }
  /**Verifica si hay un usuario autenticado basándose en el contenido del localStorage. */
  get isLoggedIn(): boolean {
    const token = localStorage.getItem('user');
    const user = JSON.parse(token as string);
    return user !== null ? true : false;
  }

  /* PARA LA UTENTICACION */

  Register(email: string, password: string, name: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        this.UserData = result.user;
        this.ngZone.run(() => {
          /* Call the SendVerificaitonMail() function when new user sign
       up and returns promise */
          this.sendEmailVerification();
          console.log('Sirve');

          updateProfile(this.UserData,{
            displayName: name
          }).then(()=>{
            console.log('El perfil se actualizo con exito');
          }).catch((error)=>{
            console.log('Se daño',error);
          })
          
          this.alertServices.successfulRedirects('Usuario creado exitosamente', 'Hemos enviado un correo de verificacion', 'pages/verify-email')
        });
      })
      .catch((error) => {
        this.alertServices.errorNotifi('Ups', error.message)
        // window.alert(error.message);
      });
  }

  login(email: string, pass: string) {
    return signInWithEmailAndPassword(this.auth, email, pass)
      .then((res: any) => {
        this.UserData = res.user;
        this.ngZone.run(() => {
          //his.router.navigate(['/dashboard']);

          console.log('SIRVE LOGIN ---> ', res);
          if(this.UserData && this.UserData.emailVerified === true){
            console.log('Usuario verificado');
            this.router.navigate(['pages/dashboard'])
          }else if(this.UserData && this.UserData.emailVerified === false){
            this.alertServices.successfulRedirects('Hey', 'Estas a un paso de iniciar sesion', 'pages/verify-email')
          } else {
            this.alertServices.successErrorRedirects('Ops','Credenciales invalidas o usuario no existe','pages/register')
          }
        })
      }).catch((error) => {
        window.alert(error.message)
        console.log(error);
      })
  }

  logout() {
    signOut(this.auth).then(() => {
      console.log('cierra sesion funcionando');
      window.location.reload();
    })
      // this.router.navigate(['/sign-in'])
  }

  reload(){
    const currentUser = this.auth.currentUser
    if (currentUser) {
      currentUser.reload().then(()=>{
        if (currentUser.emailVerified) {
          sessionStorage.setItem('isVeri','OK')
          this.alertServices.successfulRedirects('Ok', 'Ya te verificaste', 'pages/dashboard');
        }else {
          this.alertServices.errorNotifi('Ups', 'Parece que aun no')
          console.log('El correo NO ha sido verificado');
          // Muestra un mensaje al usuario para que verifique su correo
        }
      }).catch(error => {
        console.error('Error al recargar el usuario:', error);
      });
    } else{
      console.log('No existen usuarios actualmente');
      
    }
  }

  /* Con GOOGLE */

  googleAuth() {
    return this.loginWithPopup(new GoogleAuthProvider());
  }

  loginWithPopup(provider: any) {
    return signInWithPopup(this.auth, provider).then(() => {

      // this.router.navigate(['dashboard']);
      console.log('Login con Google funcionado');

    });
  }

  //ENvia correo para recuperar contraseña

  async sendPasswordResetEmails(email: string) {
    sendPasswordResetEmail(this.auth, email)
      .then(() => {
        window.alert('Hemos enviado un correo para recuperar tu cuenta');
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // envia el correo de verificcion

  sendEmailVerification() {
    return sendEmailVerification(this.auth.currentUser as User)
  }
  prueba() {
    console.log('REST');

  }

}
