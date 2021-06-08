import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Angular';
  ngOnInit(): void {
  }
/* 

Intento de que el boton se ponga en modo desactivado, no hace falta pero visualmente quedaria mejor.
No funciona por el momento

constructor(private cookieService: CookieService){

     const cookie = this.cookieService.check('token')
    const button = (<HTMLInputElement> document.getElementById("btnBingo"))

    if (!cookie) {
      button.disabled = false;
    } else {
      true
    } */
}
