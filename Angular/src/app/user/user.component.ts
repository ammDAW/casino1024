import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { PuntosService } from '../puntos.service';
import * as CryptoJS from 'crypto-js';

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

  constructor(private puntosService:PuntosService, private cookie: CookieService, private router: Router){}
  ngOnInit() {
    if(this.cookie.get('token')){
      this.getPuntosByUsername()
    }
    //this.getPuntosUser(); 
  }

  logOut(){
    this.cookie.deleteAll();
    window.location.reload();
    this.router.navigate(['/', ''])
  }
  /*getPuntosUser(){
    axios
    .get(this.url + 'points/'+ this.puntosService.getIdPoints())
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
  }*/

  getPuntosByUsername() {
    var decrypt = CryptoJS.AES.decrypt(this.cookie.get('token'), 'keyCasino1234');
    var encode = decrypt.toString(CryptoJS.enc.Utf8);

    axios
      .get(this.url + 'points?id_user.username=' + encode)
      .then(response => {
        // Handle success.
        this.puntosService.setPuntos(response.data[0].puntos);
        this.puntosService.setUser(response.data[0].id_user.username);
        this.puntosService.setIdPoints(response.data[0].id);
      })
      .then(() => {
        this.puntos = this.puntosService.getPuntos();
        this.username = this.puntosService.getUser();
      })
      .catch(error => {
        // Handle error.
        this.logOut();
      });
  }
}