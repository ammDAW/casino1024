import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bingo',
  templateUrl: './bingo.component.html',
  styleUrls: ['./bingo.component.css']
})

export class BingoComponent implements OnInit {
  tablero: number[] = new Array(80); //tablero[0] = 1 y tablero[79] = 80 es decir (i+1)
  numSelecc : number[] = new Array();
  numAleatorios: number[]=new Array(20);//numAleatorios
  resultado: string="";
  info: boolean;
  select: boolean;
  numPinchado: string;
  premio: number;
  logueado = false;
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

  getLogeado(logeado : boolean){
    this.logueado = logeado;
  }
  addClass(){
    /*
    if(document.getElementById("#tabBtn" + id).classList.contains('elegido'))
      document.getElementById("#tabBtn" + id)!.classList.toggle('elegido');  
    document.getElementById("#btn1")?.classList.add('elegido');
    */
    //this.element=document.getElementById('tabBtn{{t}}').addClass(elegido) as HTMLElement;
  /*mi idea es que se genera el tablero que es un array tablero[i], en el html se llama a t of tablero así que realmente
  tratamos el array allí para que genere los 80 botones, podemos hacer un bucle que determine si el índice del tablero, es
  decir, tablero[i] ha sido seleccionado y que le cambie el color sólo a ese*/ 
   
  }

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
      else alert("Numero máximo")  
    } 
    console.log(this.numSelecc);
   
    
    function comparar ( a:any, b:any ){ return a-b; }
    this.numSelecc.sort(comparar).slice(0,4);
    
    //se ha seleccionado el numero, así que lo ponemos amarillo 
    if(this.numSelecc.includes(num)){
      //this.select=true;
      numPinchado = "tabBtn" + num;
      document.getElementById(numPinchado).className = "elegido";
      //document.getElementById("tabBtn48").className = "rojo"
    }else{
      //this.select=false;
      numPinchado = "tabBtn" + num;
      document.getElementById(numPinchado).className = "normal";
    }

    var stringSelect = this.numSelecc.join(', ');
    
           
  }
  comparar(){
    var numPinchado = "";

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
    
    //aquí hay que tener en cuenta que si el usuario
    //elige 4 numeros tiene que acertar los 4 sí o sí para ganar premio
    //comparamos con los seleccionados
    for(let i=0; i < this.numAleatorios.length; i++){
      for(let j=0; j < this.numSelecc.length; j++){
        if(this.numAleatorios[i]==this.numSelecc[j]){
          //this.resultado="acertado";
         // this.info=true;
         numPinchado = "tabBtn" + this.numSelecc[j];
         document.getElementById(numPinchado).className = "acertado";
         numPinchado = "";
         //this.premio = 3;
         //this.resultado="has ganado "+this.premio;
        }
      }
    }

    for(let j=0; j < this.numSelecc.length; j++){
      numPinchado = "tabBtn" + this.numSelecc[j];
      if(document.getElementById(numPinchado).className != "acertado")
      {
        document.getElementById(numPinchado).className = "fallado";
      }

    }



    if(this.resultado=="")
    {
      //document.getElementById(numPinchado).className = "fallado";
      this.resultado="fallado";
      //this.info=false;
    }
    console.log("fin del juego");
  }

}
