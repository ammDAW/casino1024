import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bingo',
  templateUrl: './bingo.component.html',
  styleUrls: ['./bingo.component.css']
})
export class BingoComponent implements OnInit {
  tablero: number[] = new Array(81);
  
  constructor() {
   }

  ngOnInit(): void {
  }

  generarTablero(){
    for(let i=0; i<=80; i++){
      this.tablero[i] = i;
    }
  }

}
