import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetterService {
  private url = "http://localhost:1337/";

  constructor(private http: HttpClient) { }

  //PUNTOS
  getPuntos(){
    return this.http.get(this.url + "points/")  
  }
  getPuntosJugador(id: number){
    return this.http.get(this.url + "points/" + id)
  }

  //USUARIOS
  getUsuarios(){
    return this.http.get(this.url + "users") ; 
  }
  getUsuarioByUsername(username: string){
    return this.http.get(this.url + "users/" + username);
  }
}
