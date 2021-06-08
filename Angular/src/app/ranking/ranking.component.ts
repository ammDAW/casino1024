import { Component, OnInit } from '@angular/core';
import axios from 'axios';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  rankings: any;
  constructor() { }

  ngOnInit(): void {
    this.getPuntos();
  }
  
  getPuntos(){
    axios
    .get('http://localhost:1337/points')
    .then(response => {
      // Handle success.
      function comparar ( a:any, b:any ){ return b.puntos - a.puntos; }
      this.rankings = response.data.sort(comparar).slice(0,5);
    })
    .catch(error => {
      // Handle error.
      console.log('An error occurred:', error.response);
    });
  }

}
