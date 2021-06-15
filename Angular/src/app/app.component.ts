import { Component , OnInit, ViewChild  } from '@angular/core';
import axios from 'axios';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { PuntosService } from './puntos.service';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  @ViewChild('sidenav') sidenav: MatSidenav;
  title = 'Angular';
  logueado = false;
  idPoints: any;
  toggled = true;
  private url = "http://localhost:1337/"

  constructor(private cookie: CookieService, private puntosService: PuntosService){}
  ngOnInit(): void {
    if(this.cookie.get("token")){
      this.puntosService.setLogueado(true);
    }
    this.logueado = this.puntosService.getLogueado();
  }
  
  toggle() {
    document.getElementById("sidebar").style.backgroundColor = "green";
    document.getElementById("sidebar").style.cssText = "z-index: -1";
    if(this.toggled == false){
      document.getElementById("sidebar").style.cssText = "z-index: 3";
      this.toggled = true;
      this.sidenav.open() 
    }
    else{
      this.toggled = false;
      this.sidenav.close()
    }
    //this.sidenav.toggle();
  }
  shouldRun = true;
  nav_position: string = 'end';

  onTogglePosition(position: string) {
  this.nav_position = position === 'start' ? 'end' : 'start';
  }

  //Getters
  getLogeado(logeado : boolean){
    this.logueado = logeado;
  }
  getIdPoints(idPoints){
    this.idPoints = idPoints;
  }
}
