import { Component, OnInit, Input } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  title = 'Angular';
  @Input() idPoints: any; //id tabla points
  puntos: any;
  username : any;

  async ngOnInit() {
    this.getPuntosUser();
  }
  
  getPuntosUser(){
    console.log("getUser idPoints:" + this.idPoints)
    axios
    .get('http://localhost:1337/points/'+ this.idPoints)
    .then(response => {
      // Handle success.
      this.puntos = response.data.puntos;
      this.username = response.data.id_user.username;   
   })
    .catch(error => {
      // Handle error.
      console.log('An error occurred:', error.response);
    });
  }
}