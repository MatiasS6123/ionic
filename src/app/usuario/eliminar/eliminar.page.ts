import { Component, OnInit } from '@angular/core';
import { InteractionsService } from 'src/app/service/interactions.service';
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
 
  constructor(private db :FirebaseServiceService, private inte:InteractionsService) { }
  

  ngOnInit() {
    this.getLista();
  }

  getLista(){
    this.db.read<UserI>("Usuario").subscribe(res=>{
        this.Usuario = res;
        console.log(this.Usuario);
    });
  }

  async DeleteUsuario(usuario:UserI){

    const res= await this.inte.ODU("Alerta","¿Seguro que deseas eliminar a este usuario?");
    if(res){
      const path='Usuario'
      console.log("Eliminar")
    
      await this.db.delete(path, usuario.id)
      this.inte.presentToast("Usuario eliminado con exito")


    }

  }
}
