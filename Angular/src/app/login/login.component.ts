import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() logueado = new EventEmitter();
  jwtUser = "";
  idUser = 0;
  usernameUser = ""
  constructor() { }

  ngOnInit(): void {
    
  }

  enviarLogin(logueado : boolean){
    this.logueado.emit(logueado);
  }

  buscarUsuario(user:string, pass:string){
  axios
    .post('http://localhost:1337/auth/local', {
    identifier: user,
    password: pass,
  })
  .then(response => {
    // Handle success.
    this.enviarLogin(true);
    this.jwtUser = response.data.jwt;
    this.idUser = response.data.user.id;
    this.usernameUser = response.data.user.username;

    console.log('Well done!');
    console.log('User profile', response.data.user);
    console.log('User token', response.data.jwt);
    console.log(this.usernameUser);
  })
  .catch(error => {
    // Handle error.
    this.enviarLogin(false);
    console.log('An error occurred:', error.response);
  });
  }
}
