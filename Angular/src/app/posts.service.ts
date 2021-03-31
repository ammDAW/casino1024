import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private url = "http://localhost:1337/";

  constructor(private http: HttpClient) { }

  postUsuario(datos: any){
    return this.http.post(this.url + "users", JSON.stringify(datos));
  }

  postJugadas(datos: any){
    return this.http.post(this.url + "plays", JSON.stringify(datos));
  }

  postPuntos(datos: any){
    return this.http.post(this.url + "points", JSON.stringify(datos));
  }

  putDatos(id: number, categoria: string, datos: any){
    return this.http.put(this.url + categoria + "/" + id, JSON.stringify(datos));
  }
}
