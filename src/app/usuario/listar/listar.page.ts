import { Component, OnInit } from '@angular/core';
import { FirebaseServiceService } from 'src/app/service/firebase-service.service';
import { UserI } from 'src/models/UserI';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {

  listaUsuario: UserI[]=[];

  constructor(private db: FirebaseServiceService) { }

  ngOnInit() {
    this.getLista();
  }

  getLista(){
    this.db.read<UserI>("Usuario").subscribe(res=>{
        this.listaUsuario = res;
        console.log(this.listaUsuario);
    });
  }


}
