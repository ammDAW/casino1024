import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import axios from 'axios';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  @Output() logueado = new EventEmitter(); //booleano emitido para hacer aparecer el login o la informacion del usuario
  jwtUser: any; //clave autentificacion usuario
  idUser: any; //id usuario en tabla 'users'
  usernameUser: any; //nick usuario
  idPoints: any; //id tabla 'points' ligado al usuario
  array: any

  constructor() { }

  ngOnInit(): void {

    //JQUERY

    $('.message a').click(function () {
      $('form').animate({
        height: "toggle",
        opacity: "toggle"
      }, "slow");
    });

    //toggler LOGIN/REGISTER hostia que bien va

    $('form').submit(function (e) {
      e.preventDefault();
    });

    //FIX para que el formulario no haga reload a la pagina

  }

  //funciones creadas
  enviarLogin(logueado: boolean) {
    this.logueado.emit(logueado);
  }

  buscarUsuario(user: string, pass: string) {
    axios
      .post('http://localhost:1337/auth/local', {
        identifier: user,
        password: pass,
      })
      .then(response => {
        this.enviarLogin(true);
        this.jwtUser = response.data.jwt;
        this.idUser = response.data.user.id;
        this.usernameUser = response.data.user.username;

        this.buscarPuntos();
        this.idPoints = this.comparar(this.idUser);
      })
      .catch(error => {
        this.enviarLogin(false);
        console.log('An error occurred:', error.response);
      });
  }

  buscarPuntos() {
    axios
      .get('http://localhost:1337/points')
      .then(response => {
        // Handle success.
        function comparar(a: any, b: any) { return b.puntos - a.puntos; }
        this.array = response.data;
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error.response);
      });
  }

  comparar(idUser: any) {
    this.array.forEach(function (element: any) {
      //console.log(element)
      if (element.id_user.id === idUser) {
        return element.id;
      }

    });
  }
}
/*buscarPuntos(idUser:number){
  axios
  .get('http://localhost:1337/points')
  .then(response => {
    response.data.forEach(function(element:any){
      if (element.id_user.id = idUser){
        console.log(element.id_user.id)
        return;
      }
    for(let element of response.data){
      if (element.id_user.id = idUser){
        //console.log(element.id_user.id);
       console.log(element.id);
      }
    }
 })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response);
  });
}*/
