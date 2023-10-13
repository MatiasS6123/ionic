import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isLogged = false;

  public appPages = [
    { title: 'Registro', url: '/registro', icon: 'people', isLogged : false },
    { title: 'Inciar sesión', url: 'login', icon: 'person', isLogged : false },
    { title: 'Agregar', url: 'usuario/agregar', icon: 'add',isLogged : true },
    { title: 'Modificar', url: 'usuario/modificar', icon: 'list', isLogged : true },
    { title: 'Eliminar', url: 'usuario/eliminar', icon: 'trash', isLogged : true },
    { title: 'Listar', url: 'usuario/listar', icon: 'book', isLogged : true },
    { title: 'Listar', url: 'usuario-/listar', icon: 'book', isLogged : true },

  ];

}
