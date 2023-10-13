import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {
  
  loading:any;

  constructor(public toasController:ToastController, 
    public loadinControl:LoadingController)  { }


  async presentToast(mensaje:string){
    const toast = await this.toasController.create(
      {
        message: mensaje,
        duration:2000
      }
    );
    toast.present();
  }

  async presentLoading(mensaje:string){
    this.loading =await this.loadinControl.create(
      {
        cssClass:'my-custom-class',
        message:mensaje,
      }
    );
    await this.loading.present()

    const{role, data} = await this.loading.onDidDismiss();
    
  }

  async closeLoading(){
    this.loading =await this.loadinControl.dismiss();

  }
}