import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular';
  logueado = false;

  getLogeado(logeado : boolean){
    this.logueado = logeado;
  }
}
