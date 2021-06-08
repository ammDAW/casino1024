import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
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
