import { Component } from '@angular/core';
import axios from 'axios';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular';
  idUser = 1;
  puntos = 0;
  userName = "";

  ngOnInit(): void {

    //oculta la barra con el toggler

    $(function(){
      $("#menu-toggle").click(function(e) {
          e.preventDefault();
          $("#wrapper").toggleClass("toggled");
      });

      /* $(window).resize(function(e) {
        if($(window).width()<=768){
          $("#wrapper").removeClass("toggled");
        }else{
          $("#wrapper").addClass("toggled");
        }
      }); */
      
    });

  }
  

  getPuntosUser(){
    axios
    .get('http://localhost:1337/points/'+this.idUser)
    .then(response => {
      // Handle success.
      this.puntos = response.data.puntos;
      this.userName = response.data.id_user.username;
      
   })
    .catch(error => {
      // Handle error.
    
      console.log('An error occurred:', error.response);
    });
  }
}
