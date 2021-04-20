import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bingo',
  templateUrl: './bingo.component.html',
  styleUrls: ['./bingo.component.css']
})

export class BingoComponent implements OnInit {
  tablero: number[] = new Array(80); //tablero[0] = 1 y tablero[79] = 80 es decir (i+1)

  constructor() {
  }

  ngOnInit(): void {
    this.generarTablero();
    console.log(this.tablero);
  }

  generarTablero(){
    for(let i=0; i<=79; i++){
      this.tablero[i] = i+1;
    }
  }
  
  addClassElegido(id: any){
    /*if(document.getElementById("#tabBtn" + id).classList.contains('elegido')){
      document.getElementById("#tabBtn" + id)!.classList.toggle('elegido'); 
    }*/
    document.getElementById("#btn1")?.classList.add('elegido');
  }
}
