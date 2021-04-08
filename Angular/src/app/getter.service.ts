import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class GetterService {
  private url = "http://localhost:1337/";

  constructor() { }

  //PUNTOS
  getPuntosUser(idPoints: number){
    axios
    .get('http://localhost:1337/points/' + idPoints)
    .then(response => {

     return response;
   })
    .catch(error => {
      return error.response;
    });
  }

  getPuntos(){
    axios
    .get('http://localhost:1337/points')
    .then(response => {
      // Handle success.
      return response.data;
   })
    .catch(error => {
      // Handle error.
      return error.response;
    });
  }

  //USUARIOS
  getIdUser(username: string){
    axios
    .get('http://localhost:1337/users/')
    .then(response => {
     return response;
   })
    .catch(error => {
      return error.response;
    });
  }
}
