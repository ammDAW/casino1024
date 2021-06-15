import { Component, OnInit,ViewEncapsulation} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { PuntosService } from '../puntos.service';


@Component({
  selector: 'app-bingo',
  templateUrl: './bingo.component.html',
  styleUrls: ['./bingo.component.css']
})

export class BingoComponent implements OnInit {
  
  tablero: number[] = new Array(80); //tablero[0] = 1 y tablero[79] = 80 es decir (i+1)
  numSelecc : number[] = new Array();
  contador = 0; //para llevar la cuenta de los números acertados
  numAleatorios: number[]=new Array(20);//numAleatorios backend
  numAleatoriosFront: number[] = new Array(20); //numAleatorios front

  info: boolean;
  select: boolean;
  numPinchado: string;
  premio: number;
  existeJugada = false;
  existeGanador= true;
  numRandom: number;

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
      else alert("MAX SELECTED NUMBERS REACHED!")
    }   
    
    //ordenar array
    function comparar ( a:any, b:any ){ return a-b; }
    this.numSelecc.sort(comparar)

    //darle la clase elegido
    if(this.numSelecc.includes(num)){
      numPinchado = "tabBtn" + num;
      document.getElementById(numPinchado).className = "elegido";
    }
    else{
      numPinchado = "tabBtn" + num;
      document.getElementById(numPinchado).className = "normal";
    }
  }

  //funcion del juego
  click : boolean = false;
  jugar(apuesta){
    this.puntosPartida = this.puntosService.getPuntos();
    if(apuesta > 0 && apuesta <= this.puntosPartida && this.numSelecc.length > 0){
      this.click = !this.click;
      this.bingo(apuesta);
      var numPinchado;

      //mostramos los aleatorios en el front
      var i = 0;
      var interval = setInterval(()=>{
        document.getElementById("lottie").style.cssText = 'display: none';
        this.numRandom = this.numAleatorios[i];
        this.numAleatoriosFront[i] = this.numAleatorios[i];
        //comparar numeros
        for(let j = 0; j<this.numSelecc.length; j++){
          if(this.numAleatoriosFront.includes(this.numSelecc[j])){
            numPinchado = "tabBtn" + this.numSelecc[j];
            document.getElementById(numPinchado).className = "acertado";
          }
        }
        i++;

        //para terminar el intervalo
        if(i == 20){
          clearInterval(interval);
          
          for(let j = 0; j<this.numSelecc.length; j++){
            numPinchado = "tabBtn" + this.numSelecc[j];
            if(document.getElementById(numPinchado).classList.contains("elegido"))
              document.getElementById(numPinchado).className = "fallado";
              this.existeGanador = false;
          }
          this.existeJugada = true;
          console.log("Game finished");
        }
      }, 1500);
    }
  }

  //funcion premios
  premios(apuesta){
    if(this.contador == this.numSelecc.length){
      switch(this.contador){
        case 1: this.premio = apuesta*3; break;
        case 2: this.premio = apuesta*14; break;
        case 3: this.premio = apuesta*55; break;
        case 4: this.premio = apuesta*225; break;
        case 5: this.premio = apuesta*1000; break;
        case 6: this.premio = apuesta*5000; break;
        case 7: this.premio = apuesta*20000; break;
        case 8: this.premio = apuesta*50000; break;
      }      
      this.puntosPartida = Number(this.puntosPartida) + Number(this.premio);
    }
    else this.puntosPartida = this.puntosPartida - apuesta;

    this.puntosService.crearPlay(this.stringOut, this.stringSelect, apuesta, this.puntosPartida);
    this.puntosService.updatePuntos(this.puntosPartida);
    this.puntosService.setPuntos(this.puntosPartida);
  }

  bingo(apuesta){
    //sacar num aleatorios
    for(let i = 0; i< this.numAleatorios.length; i++){
      var count= Math.floor(Math.random()*80)+1;
      if(this.numAleatorios.indexOf(count)=== -1){
        this.numAleatorios[i]= count;
      }
      else i=i-1;
    }
  

    //comparar numeros
    for(let j = 0; j<this.numSelecc.length; j++){
      if(this.numAleatorios.includes(this.numSelecc[j])){
        this.contador++;
      }
    }
    this.stringOut = this.numAleatorios.join(', ');
    this.stringSelect = this.numSelecc.join(', ');
    
    this.premios(apuesta);
  }
}
