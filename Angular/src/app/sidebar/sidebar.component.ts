import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  title = 'Angular';
  logueado = false;

  getLogeado(logeado : boolean){
    this.logueado = logeado;
  }

  ngOnInit(): void {
    
  }

}
