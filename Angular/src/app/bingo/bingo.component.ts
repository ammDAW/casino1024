import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-bingo',
  templateUrl: './bingo.component.html',
  styleUrls: ['./bingo.component.css']
})
export class BingoComponent implements OnInit {
  tableros: number[] = new Array(81);
  //tableros: any;
  constructor() {
   }

  ngOnInit(): void {
    this.generarTablero();
    console.log(this.tableros);
  }

  generarTablero(){
    for(let i=0; i<=80; i++){
      this.tableros[i] = i;
    }
  }

}
