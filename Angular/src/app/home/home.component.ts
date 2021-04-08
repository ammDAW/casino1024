import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Angular';
  idUser = 1;
  puntos = 0;
  userName = "";

  ngOnInit(): void {
  }

  getPuntosUser(){
    axios
    .get('http://localhost:1337/points/'+this.idUser)
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
