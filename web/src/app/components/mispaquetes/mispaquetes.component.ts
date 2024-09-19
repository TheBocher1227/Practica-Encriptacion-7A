import { Component, OnInit } from '@angular/core';
import { PaquetesService } from '../../services/paquetes.service';
import { CommonModule } from '@angular/common';
import { NavigationExtras, Route, Router } from '@angular/router';

@Component({
  selector: 'app-mispaquetes',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './mispaquetes.component.html',
  styleUrl: './mispaquetes.component.css'
})
export class MispaquetesComponent implements OnInit {

  estaciones: any[] = [];


  constructor(private paquetesService: PaquetesService,  private router: Router ) { }

  ngOnInit() {
    this.paquetesService.obtenerEstaciones().subscribe(
      (response) => {
        console.log(response);
        this.estaciones = response.data; // Almacena las estaciones en el array
      },
      (error) => {
        console.error(error);

      }
    );
    }

    seleccionarEstacion(idEstacion: number) {
      let navigationExtras: NavigationExtras = {
        state: {
          estacionId: idEstacion
        }
      };
      this.router.navigate(['/navbar/sensores'], navigationExtras);      
    }
  }

