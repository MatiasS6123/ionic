import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FirebaseServiceService } from 'src/app/service/firebase-service.service';
import { UserI } from 'src/models/UserI';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  
  data: UserI ={
    id: "",
    nombre:"",
    rut:"",
    direccion:""

  }

  constructor(
    private Service: FirebaseServiceService)
    {} 
  
  ngOnInit() {
  }

  guardar_Usuario(){
    const path='Usuario'
    const id= this.Service.getId()
    this.data.id=id;
    this.Service.create(this.data,path,id).then(()=>{
      console.log("Guardado con exito")
    });
  }

  getUsuario() {
    this.Service.getCollection();
  }

}
