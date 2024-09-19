import { Component } from '@angular/core';
import { PaquetesService } from '../../services/paquetes.service';
import { NavigationExtras, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent {
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
      this.router.navigate(['/navbar/mislogs'], navigationExtras);      
    }

}
