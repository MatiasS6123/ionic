import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { InteractionsService } from '../interactions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credenciales={
    correo:'',
    password:''
  }

  constructor(private authService:AuthService,  private interactions:InteractionsService,
    private router:Router) { }

  ngOnInit() {
  }

  async login(){
      const res= await this.authService.signIn(this.credenciales.correo,this.credenciales.password).catch(error =>{
      this.interactions.closeLoading();
      this.interactions.presentToast("Credenciales incorrectas");
    });
    if(res){
      this.interactions.closeLoading();
      this.interactions.presentToast("sesión iniciada con Exito");

      this.router.navigate(['/']);
    }
    else{

    }
  }

  async onSignOut() {
    try {
      await this.authService.signOut();
      // Puedes redirigir al usuario a la página de inicio de sesión o a cualquier otra página aquí.
      this.router.navigate(['/login'])
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }

}
