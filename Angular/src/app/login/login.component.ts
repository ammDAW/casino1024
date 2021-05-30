import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import axios from 'axios';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @Output() logueado = new EventEmitter(); //booleano emitido para hacer aparecer el login o la informacion del usuario
  username: any;
  @Output() idPoints = new EventEmitter(); //id tabla 'points' ligado al usuario
  jwtUser: any; //clave autentificacion usuario
  idUser: any; //id usuario en tabla 'users'
  array: any;


  constructor() { }

  ngOnInit(): void {

    //JQuery Toggler; Login/Register animation

    $('.message a').click(function () {
      $('form').animate({height: "toggle",opacity: "toggle"}, "slow");
    });

  }

  //Funciones

  enviarLogin(logueado: boolean) { //emit Boolean para sacar componente Login o User
    this.logueado.emit(logueado);
  }

  enviarIdPoints(int){
    console.log("enviarIdPoints int =" + int )
    this.idPoints.emit(int);
  }

  //LOGIN User
  buscarUsuario(user:any, pass:any) { 
    axios
      .post('http://localhost:1337/auth/local', {
        identifier: user,
        password: pass,
      })
      .then(response => {
        this.jwtUser = response.data.jwt;
        this.idUser = response.data.user.id;
        this.username = response.data.user.username;

        this.buscarPuntos();
        this.enviarIdPoints(this.comparar(this.idUser));
        this.enviarLogin(true);
      })
      .catch(error => {
        this.enviarLogin(false);
        console.log('An error occurred:', error.response);
      });
  }

  //Busca todos los puntos para sacar los de cada usuario
  buscarPuntos() { 
    axios
      .get('http://localhost:1337/points')
      .then(response => {
        this.array = response.data;
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error.response);
      });
  }

  //Compara idUser con la tabla para sacar idPoints
  comparar(idUser: any) { 
    let int = 0;
    this.array.forEach(function (element: any) {
      if (element.id_user.id == idUser)
        int = element.id; 
    });
    return int;
  }

  //REGISTRO user
  crearUsuario(username, email, password, nombre, apellidos, fechaNac){
    let datos = {
      "username": username,
      "email": email,
      "password": password,
      "confirmed": true,
      "blocked": false,
      "nombre": nombre,
      "apellidos": apellidos,
      "fechaNac": fechaNac      
    }
    axios
      .post('http://localhost:1337/auth/local/register', datos)
      .then(response => {
        alert("Usuario Registrado")        
        this.jwtUser = response.data.jwt;
        this.idUser = response.data.user.id;
        this.username = response.data.user.username;

        this.crearPuntos(this.idUser);

        //PARA REDIRECCION QUITAR LA SIGUIENTE LINEA QUE ENVIA EL LOGIN E IMPLEMENTAR AQUI
        this.enviarLogin(true);                
      })
      .catch(error => {
        // Handle error.
        console.log('An error occurred:', error.response);
      });
  }

  //Initial points new User
  crearPuntos(userId){
    axios
      .post('http://localhost:1337/points/',{id_user: userId})
      .then(response =>{
        this.enviarIdPoints(response.data.id);
      })
  }

  //Calcula edad minima
  calcularEdad(age){
    if(age){
        const convertAge = new Date(age);
        const timeDiff = Math.abs(Date.now() - convertAge.getTime());
        if(Math.floor((timeDiff / (1000 * 3600 * 24))/365) < 18){
          //menor de edad
          (<HTMLInputElement> document.getElementById("btnRegistro")).disabled = true;
        }
        else{
          //mayor de edad
          (<HTMLInputElement> document.getElementById("btnRegistro")).disabled = false;
        }  
    }
  }
}
