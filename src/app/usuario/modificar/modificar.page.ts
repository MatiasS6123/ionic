import { Component, OnInit } from '@angular/core';
import { InteractionsService } from 'src/app/service/interactions.service';
import { FirebaseServiceService } from 'src/app/service/firebase-service.service';
import { UserI } from 'src/models/UserI';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {

  Usuario: UserI[] = [];
  newUsuario: UserI = {
    id: '', // Asigna un valor válido a id o inicialízalo de otra manera
    nombre: "",
    rut: "",
    direccion: ""
  }

  constructor(private db: FirebaseServiceService,private interec:InteractionsService) { }

  ngOnInit() {
    this.getLista();
  }

  getLista() {
    this.db.read<UserI>("Usuario").subscribe(res => {
      this.Usuario = res;
      console.log(this.Usuario);
    });
  }

  async actualizarDatos(Us: UserI) {
    await this.interec.presentLoading("Actualizando");

    const coleccion = 'Usuario';

    await this.db.update2(coleccion, Us.id, Us) // Debes pasar Us en lugar de this.newUsuario
      .then(() => {
        console.log('Dato actualizado con éxito');
      })
      .catch((error) => {
        console.error('Error al actualizar el dato:', error);
      });

      this.interec.presentToast("Usuario Modificado con exito")
      this.interec.closeLoading();
  }
}
