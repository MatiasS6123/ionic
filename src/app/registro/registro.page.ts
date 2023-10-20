import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';  // Asegúrate de ajustar la ruta si es necesario
import { Router } from '@angular/router';
import { InteractionsService } from '../service/interactions.service';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
})
export class RegistroPage implements OnInit {

  // Variables para enlazar con el formulario
  email: string = '';
  password: string = '';

  // Mensaje de error
  errorMessage: string = '';

  constructor(private authService: AuthService,private router:Router, private interaction:
    InteractionsService) { }

  ngOnInit(): void {
    // Código que quieres que se ejecute al inicializar la página
    // Si no hay necesidad de ejecutar algo específico al iniciar, puedes dejarlo vacío
  }

  async register() {

    const result = await this.authService.signUp(this.email, this.password);
    if (result !== true) {
        this.errorMessage = result;  // Mostrar el mensaje de error
        this.interaction.closeLoading();
        this.interaction.presentToast("Datos Incorrectos");
    } else {
        // Acciones después de un registro exitoso
        this.interaction.closeLoading();
        this.interaction.presentToast("Usuario Registrado con exito");
        this.router.navigate(['/']);
    }
}

signInWithGoogle() {
  this.authService.signInWithGoogle();
}

}
