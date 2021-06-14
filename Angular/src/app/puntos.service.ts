import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PuntosService {
  user;
  puntos;
  idPoints;
  logueado = false;
  private url = "http://localhost:1337/";

  constructor() { }

  //getters
  getUser(){
    return this.user;
  }

  getPuntos(){
    return this.puntos;
  }

  getIdPoints(){
    return this.idPoints;
  }

  getLogueado(){
    return this.logueado;
  }

  //setters
  setUser(user){
    this.user = user;
  }

  setPuntos(puntos){
    this.puntos = puntos;
  }

  setIdPoints(idPoints){
    this.idPoints = idPoints;
    //this.buscarPuntos;
  }

  setLogueado(logueado){
    this.logueado = logueado;
  }

  //busca los puntos del usuario en la tabla Points
  buscarPuntos(){
    axios
    .get(this.url + 'points/'+ this.idPoints)
    .then(response => {
      // Handle success.
      this.puntos = response.data.puntos;
      this.user = response.data.id_user.username;   
    })
    .catch(error => {
      // Handle error.
      console.log('An error occurred:', error.response);
    });
  }
}
