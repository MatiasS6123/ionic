import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { InteractionsService } from 'src/app/service/interactions.service';
import { FirebaseServiceService } from 'src/app/service/firebase-service.service';
import { UserI } from 'src/models/UserI';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  myForm: FormGroup; // Define tu formulario

  data: UserI = {
    id: '',
    nombre: '',
    rut: '',
    direccion: ''
  };

  constructor(
    private Service: FirebaseServiceService,
    private interac: InteractionsService,
    private fb: FormBuilder
  ) {
    this.myForm = fb.group({
      nombre: ['', Validators.required],
      rut: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  async guardar_Usuario() {
    if (this.myForm.valid) {
      // El formulario es válido, puedes enviar los datos
      // ...
      await this.interac.presentLoading('Guardando');
    const path = 'Usuario';
    const id = this.Service.getId();
    this.data.id = id;
    console.log(this.data)
    console.log(this.myForm)
    await this.Service.create(this.data, path, id).then(() => {
      console.log('Guardado con éxito');
      this.myForm.reset(); // Limpia los campos después de agregar datos
    });
    this.interac.presentToast('Usuario guardado con éxito');
    this.interac.closeLoading();

    }
    
  }

  getUsuario() {
    this.Service.getCollection();
  }

  validateRutFormat(control: FormControl) {
    const rut = control.value;
    if (!rut) {
      return null;
    }
    const pattern = /^[0-9]+-[0-9kK]{1}$/;
    if (!pattern.test(rut)) {
      return { invalidRut: true };
    }
    return null;
  }
}
