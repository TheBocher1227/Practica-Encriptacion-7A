import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaquetesService } from '../../services/paquetes.service';
import { Sensor } from '../../Interfaces/sensor';
import { interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sensores',
  standalone : true,
  imports:[CommonModule],
  templateUrl: './sensores.component.html',
  styleUrls: ['./sensores.component.css']
})
export class SensoresComponent implements OnInit, OnDestroy {
  idEstacion: number = 0;
  registros: Sensor[] = [];
  pollingSubscription!: Subscription;
  

  constructor(private paquetesService: PaquetesService, private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.idEstacion = window.history.state.estacionId;
    console.log('ID de la estación seleccionada:', this.idEstacion);
    this.obtenerRegistrosPorEstacion();

    // Inicia el polling cada 6 segundos
    this.pollingSubscription = interval(6000).subscribe(() => {
      this.obtenerRegistrosPorEstacion();
    });
  }

  obtenerRegistrosPorEstacion() {
    this.paquetesService.obtenerRegistrosPorEstacion(this.idEstacion, 'token').subscribe(
      (response) => {
        if (response && Array.isArray(response.data)) {
          this.registros = response.data;
          this.registros.forEach(sensor => {
            if (sensor && sensor.data) {
              console.log(sensor.data);
            } else {
              console.log('Sensor o sensor.data es undefined:', sensor);
            }
          });
        } else {
          console.log('Response.data no es un array:', response);
        }
      },
      (error) => {
        console.error('Error al obtener registros:', error);
      }
    );
  }

  ngOnDestroy() {
    // Detiene el polling al salir del componente
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

  regresar(){
    this.router.navigate(['/navbar/mispaquetes']); 
  }
  enviarValor(event: Event) {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    const valor = checked ? '1' : '0';
    
    console.log('Valor a enviar:', valor);
    console.log('ya se envio alv');

    // Imprimir el valor antes de la validación
    console.log('Valor a enviar al servidor:', valor);

    if (valor === '1' || valor === '0') {
        this.http.post('http://192.168.137.51:8000/api/guardarValor', { value: valor }).subscribe(
            () => {
                console.log('Valor enviado correctamente');
            },
            (error) => {
                console.error('Error al enviar el valor:', error);
            }
        );
    } else {
        console.error('Error: El valor debe ser "1" o "0".');
    }
}
}