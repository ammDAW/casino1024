import { Component , OnInit } from '@angular/core';
import axios from 'axios';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { PuntosService } from './puntos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  

  title = 'Angular';
  idUser = 1;
  puntos = 0;
  userName = "";
  private url = "http://localhost:1337/"

  constructor(private cookie: CookieService, private puntosService: PuntosService){}
  ngOnInit(): void {
    if(this.cookie.get("token")){
      this.puntosService.setLogueado(true);
      console.log(this.puntosService.getLogueado())
    }
  }
  

  getPuntosUser(){
    axios
    .get(this.url + 'points/'+ this.idUser)
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
