import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UserI } from 'src/models/UserI';
@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(private db:AngularFirestore) { }

 

  

  create(data:any, path:string,id:string) {
    const collection =this.db.collection(path)
    return collection.doc(id).set(data) 
  }
  read<tipo>(path:string){
    const collection=this.db.collection<tipo>(path);
    return collection.valueChanges();
  }

  update(path:string,id:string,data:any){
    return this.db.collection(path).doc(id).update(data);

  }

  update2(coleccion: string, id: string, datos: any): Promise<void> {
    return this.db.collection(coleccion).doc(id).update(datos);
  }
  delete(path:string,id:string){
    const collection=this.db.collection(path)
    return collection.doc(id).delete()
  }

  

  


  getCollection(){
    this.db.collection('Usuario').valueChanges().subscribe((res)=>{
      console.log("Hola", res);
    })
  }
  getId(){
    return this.db.createId();
  }
}
