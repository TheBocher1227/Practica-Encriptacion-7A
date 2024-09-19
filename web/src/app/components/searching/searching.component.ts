import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JuegoService } from '../../services/juego.service';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { SpinnerComponent } from '../spinner/spinner.component';

(window as any).Pusher = Pusher;

@Component({
  selector: 'app-searching',
  standalone: true,
  imports: [ SpinnerComponent ],
  templateUrl: './searching.component.html',
  styleUrl: './searching.component.css'
})

export class SearchingComponent implements OnInit {

  constructor(private router: Router, private js: JuegoService, private ngZone: NgZone) { }

  public echo: Echo = new Echo({
    broadcaster: 'pusher',
    key: '123',
    cluster: 'mt1',
    wsHost: 'localhost',
    wsPort: 6001,
    forceTLS: false,
    disableStatus: true,
  });;

  ngOnInit(): void {

    this.websocket();

    // this.js.getQueue().subscribe(
    //   (response) => {
    //     console.log(response)
    //   }
    // )

    // Inicia la búsqueda de partida cuando el componente se inicie
    this.js.buscarPartida().subscribe(
      (response) => {
        console.log(response); 
        // No redirigir aquí, la redirección se manejará en el websocket()
      }
    );
  }

  websocket() {
    this.echo.channel('matchplayer').listen('MatchPlayers', (res: any) => {
      console.log('Jugadores emparejados en la partida:', res);
      
      // Redirige a la pantalla del juego
      this.ngZone.run(() => {
        this.router.navigate(['/juego'] );
      });
    });

    this.echo.connect();
  }
}
