import { Component, OnInit,ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';


//import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  @ViewChild('sidenav') sidenav: MatSidenav;

  reason = '';

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  shouldRun = true;
 nav_position: string = 'end';

 onTogglePosition(position: string) {
  this.nav_position = position === 'start' ? 'end' : 'start';
  
}
  
  title = 'Angular';
  logueado = false;
  idPoints: any;

  getLogeado(logeado : boolean){
    this.logueado = logeado;
  }

  getIdPoints(idPoints){
    this.idPoints = idPoints;
  }

  ngOnInit(): void {
    this.getIdPoints(this.idPoints)
  }
  
}