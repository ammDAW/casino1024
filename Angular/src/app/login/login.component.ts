import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logueado = false;
  jwtUser = "";
  idUser = 0;
  usernameUser = ""
  constructor() { }

  ngOnInit(): void {
  }

  buscarUsuario(user:string, pass:string){
    console.log(user);
    console.log(pass);
    /*axios
    .post('http://localhost:1337/auth/local', {
    identifier: user,
    password: pass,
  })
  .then(response => {
    // Handle success.
    this.logueado = true;
    this.jwtUser = response.data.jwt;
    this.idUser = response.data.id;
    this.usernameUser = response.data.username;

    console.log('Well done!');
    console.log('User profile', response.data.user);
    console.log('User token', response.data.jwt);
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response);
  });*/
  }
}
