import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PuntosService {
  idUser; //id user tabla users
  jwt; //key header
  user; //username
  puntos; //puntos
  idPoints; //id user tabla points
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

  getIdUser(){
    return this.idUser;
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

  setIdUser(id){
    this.idUser = id;
  }

  setJwt(jwt){
    this.jwt = jwt;
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

  //crear jugada en bbdd
  crearPlay(numOut, numSelect, apuesta, puntosPartida){
    axios
      .post(this.url + 'plays/', {
          "id_user": this.idUser,
          "ptos_inicial": this.puntos,
          "ptos_final": puntosPartida,
          "num_select": numSelect,
          "num_out": numOut,
          "apuesta": apuesta
      })
  }

  //actualizar puntos en bbdd
  updatePuntos(puntos){
    axios
      .put(this.url + 'points/' + this.idPoints, {
        "puntos": puntos
      })
  }
}
