import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bingo',
  templateUrl: './bingo.component.html',
  styleUrls: ['./bingo.component.css']
})

export class BingoComponent implements OnInit {
  tablero: number[] = new Array(80); //tablero[0] = 1 y tablero[79] = 80 es decir (i+1)
  numSelecc : number[] = new Array();
  numAleatorios: number[]=new Array();//numAleatorios
  resultado: string="";
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
    /* if(document.getElementById("#tabBtn" + id).classList.contains('elegido')){
      document.getElementById("#tabBtn" + id)!.classList.toggle('elegido');  */

      document.getElementById("#btn1").classList.toggle('elegido');
  }

  addNumero(num: number){
    if (this.numSelecc.includes(num)){
      var index = this.numSelecc.indexOf(num);
      this.numSelecc.splice(index, 1);
    }
    else{
      if (this.numSelecc.length < 8)
        this.numSelecc.push(num); 
      else alert("Numero máximo")  
    }
    console.log(this.numSelecc);
    function comparar ( a:any, b:any ){ return a-b; }
    this.numSelecc.sort(comparar).slice(0,4); 

    var stringSelect = this.numSelecc.join(', ');
    
           
  }
  comparar(){
    //sacamos los aleatorios
    for(let i=0; i < 20; i++){
      var count= Math.floor(Math.random()*80)+1;
      console.log(count);
      if(this.numAleatorios.indexOf(count)=== -1){
        this.numAleatorios[i]= count;
      }else
      {
        i=i-1;
      }
    }
    console.log(this.numAleatorios);
    
    var stringRandoms = this.numAleatorios.join(', ');
  

    this.resultado="";
    //comparamos con los seleccionados
    for(let i=0; i < this.numAleatorios.length; i++){
      for(let j=0; j < this.numSelecc.length; j++){
        if(this.numAleatorios[i]==this.numSelecc[j]){
          this.resultado="acertado";
        } 
      }
    }

    if(this.resultado=="")
    {
      this.resultado="fallado";
    }
    console.log("fin del juego");
  }
}
