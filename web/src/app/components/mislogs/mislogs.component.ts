import { Component, OnInit } from '@angular/core';
import { Sensor } from '../../Interfaces/sensor';
import { Router } from '@angular/router';
import { PaquetesService } from '../../services/paquetes.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms'; // Importar FormsModule

@Component({
  selector: 'app-mislogs',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule], // Añadir FormsModule a los imports
  templateUrl: './mislogs.component.html',
  styleUrls: ['./mislogs.component.css']
})
export class MislogsComponent implements OnInit {
  idEstacion = 0;
  p: number = 1;
  registros: Sensor[] = [];
  registrosFiltrados: Sensor[] = [];
  tipoSensorSeleccionado: string = '';
  tiposSensor: string[] = ['TE', 'HU', 'US', 'FR' ,'IR' , 'RP'];

  ngOnInit() {
    this.idEstacion = window.history.state.estacionId;
    this.obtenerLogs();
  }

  constructor(private paquetesService: PaquetesService, private router: Router) {}

  obtenerLogs() {
    this.paquetesService.mislogs(this.idEstacion).subscribe(
      (response) => {
        if (response && Array.isArray(response.data)) {
          this.registros = response.data;
          this.registrosFiltrados = [...this.registros];
        } else {
          console.log('Response.data no es un array:', response);
        }
      },
      (error) => {
        console.error('Error al obtener registros:', error);
      }
    );
  }

  filtrarPorTipoSensor() {
    if (this.tipoSensorSeleccionado === '') {
      this.registrosFiltrados = [...this.registros];
    } else {
      this.registrosFiltrados = this.registros.filter(registro => registro.data.tipo_sensor === this.tipoSensorSeleccionado);
    }
  }

  salir() {
    this.router.navigate(['/navbar/logs']);
  }
}