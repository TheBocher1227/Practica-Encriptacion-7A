 import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { EchoService } from '../../services/echo-service.service';

@Component({
  selector: 'app-datosestaciones',
  standalone: true,
  templateUrl: './datosestaciones.component.html',
  styleUrl: './datosestaciones.component.css'
})
export class DatosestacionesComponent implements OnInit {

  idEstacion: number = 0;

  constructor(private route: ActivatedRoute, private router: Router, private echoService: EchoService) {
  }

  ngOnInit() {
    this.idEstacion = window.history.state.estacionId;
    console.log('ID de la estación seleccionada:', this.idEstacion);

    setTimeout(() => {
      this.echoService.listentest((data) => {
        console.log('Echo data:', data);
      })
    }, 1500); // Inicializa setupEcho después de 2 segundos
  }

ngOnDestroy(){
    this.echoService.leaveChannel('sensores');
  }


}