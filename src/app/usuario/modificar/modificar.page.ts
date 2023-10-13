import { Component, OnInit } from '@angular/core';
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

  constructor(private db: FirebaseServiceService) { }

  ngOnInit() {
    this.getLista();
  }

  getLista() {
    this.db.read<UserI>("Usuario").subscribe(res => {
      this.Usuario = res;
      console.log(this.Usuario);
    });
  }

  actualizarDatos(Us: UserI) {
    const coleccion = 'Usuario';

    this.db
      .update2(coleccion, Us.id, Us) // Debes pasar Us en lugar de this.newUsuario
      .then(() => {
        console.log('Dato actualizado con éxito');
      })
      .catch((error) => {
        console.error('Error al actualizar el dato:', error);
      });
  }
}
