import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from 'src/app/service/firebase-service.service';
import { UserI } from 'src/models/UserI';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.page.html',
  styleUrls: ['./eliminar.page.scss'],
})
export class EliminarPage implements OnInit {

  Usuario: UserI[]=[];
  newUsuario: UserI={
    id: this.db.getId(),
    nombre:"",
    rut:"",
    direccion:""

  }
 
  constructor(private db :FirebaseServiceService) { }
  

  ngOnInit() {
    this.getLista();
  }

  getLista(){
    this.db.read<UserI>("Usuario").subscribe(res=>{
        this.Usuario = res;
        console.log(this.Usuario);
    });
  }

  DeleteUsuario(usuario:UserI){
    const path='Usuario'
    console.log("Eliminar")
    
    this.db.delete(path, usuario.id)

  }
}
