import { Component, OnInit, Input } from '@angular/core';
import axios from 'axios';
import { PuntosService } from '../puntos.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  title = 'Angular';
  @Input() idPoints: any; //id tabla points
  puntos: any;
  username: any;

  //pruebaPuntos = this.puntosService.getPuntos();
  //pruebaUsername = this.puntosService.getUser();
  private url = "http://localhost:1337/"

  constructor(private puntosService:PuntosService){}
  async ngOnInit() {
    this.getPuntosUser(); 
  }

  getPuntosUser(){
    axios
    .get(this.url + 'points/'+ this.idPoints)
    .then(response => {
      // Handle success.
      this.puntosService.setPuntos(response.data.puntos);
      this.puntosService.setUser(response.data.id_user.username);   
    })
    .then(() => {
      this.puntos = this.puntosService.getPuntos();
      this.username = this.puntosService.getUser();
    })
    .catch(error => {
      // Handle error.
      console.log('An error occurred:', error.response);
    });
  }
}