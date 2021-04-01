import { Component, OnInit } from '@angular/core';
import axios from 'axios';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  puntosTotal = [{puntos: 0}];
  constructor() { }

  ngOnInit(): void {
    this.getPuntos();
  }
  
  getPuntos(){
    axios
    .get('http://localhost:1337/points')
    .then(response => {
      // Handle success.
      this.puntosTotal = response.data;
      
      console.log(this.puntosTotal); 
   })
    .catch(error => {
      // Handle error.
    
      console.log('An error occurred:', error.response);
    });
  }

}
