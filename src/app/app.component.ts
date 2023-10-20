import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { InteractionsService } from './service/interactions.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent {
  login:boolean=false;
  modoOscuro: boolean = false;

  constructor(private auth: AuthService, private inte: InteractionsService,private platform: Platform) {
    auth.getUserAuthState().subscribe(user => {
      if (user) {
        // El usuario está autenticado
        console.log('Usuario autenticado', user);
        this.login=true;
        
      } else {
        // El usuario no está autenticado
        console.log('Usuario no autenticado');
        this.login=false
      }
    })
  }
  async logOut() {
    const res= await this.inte.ODU("Alerta","¿Deseas cerrar sesion?");
    if(res){
      this.auth.signOut()
      .then(() => {
        // La sesión se ha cerrado con éxito
        console.log('Sesión cerrada correctamente');
      })
      .catch(error => {
        // Se produjo un error al cerrar la sesión
        console.error('Error al cerrar sesión:', error);
      });

      this.inte.presentToast("Sesión cerrada con exito")

    }
    
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Verifica si el sistema admite el modo oscuro
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.modoOscuro = true;
      }
    });
  }

  cambiarModoOscuro() {
    document.body.classList.toggle('dark-theme', this.modoOscuro);
  }

}