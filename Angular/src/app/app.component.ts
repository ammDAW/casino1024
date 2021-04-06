import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular';
  logueado = false;
  idUser = 1;
  puntos = 0;
  userName = "";

  getLogeado(logeado : boolean){
    this.logueado = logeado;
  }

  getPuntosUser(){
    axios
    .get('http://localhost:1337/points/'+this.idUser)
    .then(response => {
      // Handle success.
      this.puntos = response.data.puntos;
      this.userName = response.data.id_user.username;
      
   })
    .catch(error => {
      // Handle error.
    
      console.log('An error occurred:', error.response);
    });
  }
}
