import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { AngularFirestore,} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage'; // Asegúrate de usar compatibilidad si es necesario

import { finalize, map, Observable } from 'rxjs';

export interface Lugares {
  // id: string,
  title: string,
  description: string,
  imagen: string
}


export type placeCreate = Omit<Lugares, 'id'>
const PATH = 'lugares';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private filePath: any;
  private dowloadUrl: Observable<string>;
  private imgUrl: string = 'https://api.cloudinary.com/v1_1/da4si8eaz/image/upload'

  constructor(
    private http: HttpClient,
    private _firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {
  }

  create(lugar: Lugares) {
    console.log('lugar ----->', lugar);
    return this._firestore.collection(PATH).add(lugar)
  }

  getPlaces() {
    return this._firestore.collection(PATH).snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as { title: string; description: string }; // Extrae los datos
          const id = a.payload.doc.id; // Obtén el ID del documento si lo necesitas
          return { id, ...data }; // Devuelve solo lo que necesitas
        })
      )
    );;
  }

  // uploadImage(lugar: any, img: any) {
  //   this.filePath = `image/${img.name}`;
  //   const fileRef = this.storage.ref(this.filePath);
  //   const place = this.storage.upload(this.filePath, img)

  //   place.snapshotChanges()
  //   .pipe(
  //     finalize(()=> {
  //       fileRef.getDownloadURL().subscribe((url: any)=>{
  //         this.dowloadUrl = url;
  //         console.log('URL IMAGE --->', url);
  //         console.log('URL IMAGE --->', lugar);
          
  //       })
  //     })
  //   ).subscribe()
  // }


  uploadImages(file: any): Observable<any> {
    try {
      return this.http.post(this.imgUrl, file);
    } catch (error) {
      console.log('Se jodio esta vaina', error);
    }
  }
}
