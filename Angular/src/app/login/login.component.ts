import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import axios from 'axios';
import * as $ from 'jquery';
import { Router } from '@angular/router'
import { UserComponent } from '../user/user.component';
import { CookieService } from 'ngx-cookie-service';
import { PuntosService } from '../puntos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  //Emitters
  @Output() logueado = new EventEmitter(); //Booleano que muestra la informacion del usuario
  @Output() idPoints = new EventEmitter(); //Id tabla 'points' + id usuario

  username: any;
  jwtUser: any; //JWT del usuario
  idUser: any; //Id en tabla "users"
  array: any;
  private url = "http://localhost:1337/"

  constructor(private router: Router, private cookie: CookieService, private puntosService: PuntosService) { }

  ngOnInit(): void {

    //Login/Register animation
    $('.message a').click(function () {
      $('form').animate({height: "toggle",opacity: "toggle"}, "slow");
    });

    //FIX para que el formulario no haga reload a la pagina
    $('form').submit(function (e) {
      e.preventDefault();
    });
  }

  //Funciones
  enviarLogin(logueado: boolean) { //emit Boolean para sacar componente Login o User
    this.logueado.emit(logueado);
  }
  enviarIdPoints(int){
    this.idPoints.emit(int);
  }

  //LOGIN User
  buscarUsuario(user:any, pass:any) {
    axios
      .post(this.url + 'auth/local/', {
        identifier: user,
        password: pass,
      })
      .then(response => {
        this.puntosService.setJwt(response.data.jwt);
        this.puntosService.setIdUser(response.data.user.id);
        this.puntosService.setUser(response.data.user.username);
        //this.jwtUser = response.data.jwt;
        //this.idUser = response.data.user.id;
        //this.username = response.data.user.username;

        this.cookie.get('token');

        this.buscarPuntos();
        this.puntosService.setIdPoints(this.comparar(response.data.user.id));

        //Cookie
        this.cookie.set('token', response.data.user.username, {
          expires: 30 / 1440
        });
        
        //this.enviarIdPoints(this.comparar(this.idUser));
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
      .get(this.url + 'points/')
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
      .post(this.url + 'auth/local/register', datos)
      .then(response => {
        alert("Usuario Registrado");       
        /*this.jwtUser = response.data.jwt;
        this.idUser = response.data.user.id;
        this.username = response.data.user.username;

        //Cookie
        this.cookie.set('token', this.jwtUser, {
          expires: 30 / 1440
        });
        this.cookieValue = this.cookie.get('token');
        */
        this.crearPuntos(response.data.user.id);
        window.location.reload();            
      })
      .catch(error => {
        console.log('An error occurred:', error.response);
      });
  }

  //Initial points new User
  crearPuntos(userId){
    axios
      .post(this.url + 'points/',{id_user: userId})
      .then(response =>{
        console.log('Puntos creados');
        //this.enviarIdPoints(response.data.id);
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
