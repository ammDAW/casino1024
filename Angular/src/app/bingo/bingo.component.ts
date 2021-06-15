import { Component, OnInit,ViewEncapsulation} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
//import * as internal from 'node:stream';
import { PuntosService } from '../puntos.service';


@Component({
  selector: 'app-bingo',
  templateUrl: './bingo.component.html',
  styleUrls: ['./bingo.component.css']
})

export class BingoComponent implements OnInit {
  
  tablero: number[] = new Array(80); //tablero[0] = 1 y tablero[79] = 80 es decir (i+1)
  numSelecc : number[] = new Array();
  contador: number; //para llevar la cuenta de los números acertados
  numAleatorios: number[]=new Array(20);//numAleatorios
  resultado: string="";
  info: boolean;
  select: boolean;
  numPinchado: string;
  premio: number;

  stringSelect: string;
  stringOut: string;
  puntosPartida: number;
  
  constructor(private modal:NgbModal, private puntosService: PuntosService) { }
  


  ngOnInit(): void {
    this.generarTablero();
  }

  openSM(contenido){
  this.modal.open(contenido,{size:'sm'});
  }
  openLG(contenido){
    this.modal.open(contenido,{size:'lg'});
  }
  openXL(contenido){
    this.modal.open(contenido,{size:'xl'});
  }
  openCentrado(contenido){
    this.modal.open(contenido,{centered:true});
  }
  openScroll(contenido){
    this.modal.open(contenido,{scrollable:true});
  }

  generarTablero(){
    for(let i=0; i<=79; i++){
      this.tablero[i] = i+1;
    }
  }

  refresh(): void { window.location.reload(); }


  //le da a los botones del tablero los numeros
  addNumero(num: number){
    var numPinchado = "";

    if (this.numSelecc.includes(num)){
      var index = this.numSelecc.indexOf(num);
      this.numSelecc.splice(index, 1);
    }
    else{
      if (this.numSelecc.length < 8){
        this.numSelecc.push(num); 
      }
      else alert(" MAX SELECTED NUMBERS REACHED!")
    }   
    
    function comparar ( a:any, b:any ){ return a-b; }
    //this.numSelecc.sort(comparar).slice(0,4);
    this.numSelecc.sort(comparar)
    //se ha seleccionado el numero, así que lo ponemos amarillo 
    if(this.numSelecc.includes(num)){
      //this.select=true;
      numPinchado = "tabBtn" + num;
      document.getElementById(numPinchado).className = "elegido";
      //document.getElementById("tabBtn48").className = "rojo"
    }
    else{
      //this.select=false;
      numPinchado = "tabBtn" + num;
      document.getElementById(numPinchado).className = "normal";
    }

    var stringSelect = this.numSelecc.join(', ');
  }

  click : boolean = false;
  comparar(apuesta){
    this.click = !this.click;
    var numPinchado = "";

    //sacamos los aleatorios
    for(let i=0; i < 20; i++){
      var count= Math.floor(Math.random()*80)+1;
      if(this.numAleatorios.indexOf(count)=== -1){
        this.numAleatorios[i]= count;
      }
      else{
        i=i-1;
      }
    }
    //this.numAleatorios.slice(); no funciona

    this.stringOut = this.numAleatorios.join(', ');
    this.stringSelect = this.numSelecc.join(', ');
    this.puntosPartida = this.puntosService.getPuntos();
    this.resultado="";
    
    //aquí hay que tener en cuenta que si el usuario
    //elige 4 numeros tiene que acertar los 4 sí o sí para ganar premio
    //comparamos con los seleccionados

    for(let i=0; i < this.numAleatorios.length; i++){
      for(let j=0; j < this.numSelecc.length; j++){
        if(this.numAleatorios[i]==this.numSelecc[j]){
          this.contador+=1;
          this.resultado="";
          // this.info=true;
          numPinchado = "tabBtn" + this.numSelecc[j];
          document.getElementById(numPinchado).className = "acertado";
          numPinchado = "";
          if(this.contador=this.numSelecc.length){
            switch(this.contador){
              case 1: this.premio=apuesta*3; break;
              case 2: this.premio=apuesta*14; break;
              case 3: this.premio=apuesta*55; break;
              case 4: this.premio=apuesta*225; break;
              case 5: this.premio=apuesta*1000; break;
              case 6: this.premio=apuesta*5000; break;
              case 7: this.premio=apuesta*20000; break;
              case 8: this.premio=apuesta*50000; break;
            }
            this.resultado = " Congratulations! You've won "+this.premio+" Bytes!";
            this.puntosPartida = Number(this.puntosPartida) + Number(this.premio);
          }
        }
      }
    }
    
    for(let j=0; j < this.numSelecc.length; j++){
      numPinchado = "tabBtn" + this.numSelecc[j];
      if(document.getElementById(numPinchado).className != "acertado"){
        document.getElementById(numPinchado).className = "fallado";
      }
    }

    if(this.resultado==""){
      //document.getElementById(numPinchado).className = "fallado";
      this.puntosPartida = this.puntosPartida - apuesta;
      this.resultado=" Oops, bad luck this time. Try again!";
      //this.info=false;
      for(let j=0; j < this.numSelecc.length; j++){
        numPinchado = "tabBtn" + this.numSelecc[j];
        document.getElementById(numPinchado).className = "fallado";
      }
    }
    console.log("fin del juego");
    this.puntosService.crearPlay(this.stringOut, this.stringSelect, apuesta, this.puntosPartida);
    this.puntosService.updatePuntos(this.puntosPartida);
    this.puntosService.setPuntos(this.puntosPartida);
  }
}
