import { Component, OnInit  ,ViewChild } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  opened=false;

  @ViewChild('sidenav') sidenav: MatSidenav;

  title = 'Angular';
  logueado = false;
  idPoints: any;
  reason = '';

  ngOnInit(): void {
    this.getIdPoints(this.idPoints)
  }

  //Sidebar toggler
  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
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