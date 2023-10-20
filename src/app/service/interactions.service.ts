import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InteractionsService {
  
  loading:any;

  constructor(public toasController:ToastController, 
    public loadinControl:LoadingController,private alertC:AlertController)  { }


  async presentToast(mensaje:string){
    const toast = await this.toasController.create(
      {
        message: mensaje,
        duration:2000
      }
    );
    await toast.present();
  }

  async presentLoading(mensaje: string) {
    this.loading = await this.loadinControl.create({
      cssClass: 'my-custom-class',
      message: mensaje,
    });
    await this.loading.present();
  }
  
  async closeLoading() {
    await this.loadinControl.dismiss(); // Cierra el componente de carga
  }

  async ODU(texto:string,subt:string){
    let aceptar;
    const alert= await this.alertC.create({
      cssClass:'my-custom-class',
      header:texto,
      subHeader:subt,
      buttons:[
        {
          text:'Cancelar',
          role:'cancel',
          cssClass:'secundary',
        },{
          text:'ok',
          handler:()=>{
            aceptar=true;
          }
        }
      ]
    });
    await alert.present();
    await alert.onDidDismiss()
    return aceptar;


  }
  
}