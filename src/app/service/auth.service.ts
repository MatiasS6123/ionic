import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Importación del módulo de autenticación de AngularFire
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth'; // Importa 'GoogleAuthProvider' desde 'firebase/auth'
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router:Router, private googlePlus: GooglePlus) {}

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


  async loginWithGoogle() {
    try {
      const res = await this.googlePlus.login({
        'webClientId': '1010365717275-6vuja29lumottjqgvdaafcs6t9icd86d.apps.googleusercontent.com',
        'offline': true
      });

      // Aquí es donde se corrigió el código
      const googleCredential = GoogleAuthProvider.credential(res.idToken);

      const firebaseUser = await this.afAuth.signInWithCredential(googleCredential);
      console.log('Firebase success:', firebaseUser);
    } catch (error) {
      console.error('Error:', error);
    }
  }






  logOut(){
    this.afAuth.signOut();
  }





    // Aquí puedes añadir más métodos como signUp, signOut, etc.



}

