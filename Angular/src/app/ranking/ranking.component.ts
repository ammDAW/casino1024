import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { element } from 'protractor';


@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  puntos = [];
  constructor() { }

  ngOnInit(): void {
    this.getPuntos();
  }
  
  getPuntos(){
    axios
    .get('http://localhost:1337/points')
    .then(response => {
      // Handle success.
      response.data.forEach((item:any) => {
        let newResultado = [item.user.username, item.points];
        console.log(newResultado);
      });
   })
    .catch(error => {
      // Handle error.
    
      console.log('An error occurred:', error.response);
    });
  }

}
