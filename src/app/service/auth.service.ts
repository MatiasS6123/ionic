import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Importación del módulo de autenticación de AngularFire
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth'; // Importa 'GoogleAuthProvider' desde 'firebase/auth'



@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router:Router) {}  // Inyectamos AngularFireAuth

  async signIn(email: string, password: string): Promise<boolean> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password); // Utilizamos el método de AngularFireAuth
      return true;
    } catch (error) {
      console.error("Error al iniciar sesión: ", error);
      return false;
    }
  }

  async signUp(email: string, password: string): Promise<any> {
    try {
        await this.afAuth.createUserWithEmailAndPassword(email, password);
        return true;
    } catch (error) {
        if (error !== null && typeof error === 'object' && 'message' in error) {
            console.error("Error al registrar:", error.message);  // Mostrar el mensaje de error en consola
            return error.message;  // Devolver el mensaje de error
        } else {
            console.error("Error desconocido al registrar:", error);
            return "Error desconocido al intentar registrar.";
        }
    }
}

  async signOut(): Promise<void> {
  await this.afAuth.signOut();
  this.router.navigate(['/login']);  // Redirigir al usuario al inicio de sesión después de cerrar sesión
}

  // Aquí puedes añadir más métodos como signUp, signOut, etc.

  getUserAuthState() {
    return this.afAuth.authState; // Cambiar de getUserAuthState a authState
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const result = await this.afAuth.signInWithPopup(provider);
      // El inicio de sesión con éxito devuelve un usuario en result.user
      this.router.navigate(['/']); // Redirigir a la página deseada después del inicio de sesión
    } catch (error) {
      console.error('Error de inicio de sesión', error);
    }
  }

  logOut(){
    this.afAuth.signOut();
  }





    // Aquí puedes añadir más métodos como signUp, signOut, etc.



}

