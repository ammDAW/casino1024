import { Component , OnInit } from '@angular/core';
import axios from 'axios';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  

  title = 'Angular';
  idUser = 1;
  puntos = 0;
  userName = "";
  private url = "http://localhost:1337/"

  ngOnInit(): void {
    

  
      
    

  }
  

  getPuntosUser(){
    axios
    .get(this.url + 'points/'+ this.idUser)
    .then(response => {
      // Handle success.
      this.puntos = response.data.puntos;
      this.userName = response.data.id_user.username;
      
   })
    .catch(error => {
      // Handle error.
    
      console.log('An error occurred:', error.response);
    });
  }
}
