import { Component } from '@angular/core';
import { PaquetesService } from '../../services/paquetes.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-paquetes',
  standalone: true,
  imports: [ RouterLink, CommonModule, ReactiveFormsModule, FormsModule ],
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.css']
})
export class PaquetesComponent {
  paqueteForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  
  constructor(private fb: FormBuilder, private paquetesService: PaquetesService) {
    this.paqueteForm = this.fb.group({
      idEstacion: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  get email() {
    return this.paqueteForm.get('idEstacion');
  }

  onSubmit() {
    if (this.paqueteForm && this.paqueteForm.valid) {
      const idEstacion = this.paqueteForm.get('idEstacion')?.value;
      const token = localStorage.getItem('token');
      if (token) {
        this.paquetesService.guardarRelacionEstacion(idEstacion, token).subscribe(
          response => {
            console.log('Response:', response);
            if (response.success && response.message === 'Relación creada correctamente.') {
              this.successMessage = response.message;
              this.paqueteForm.reset();
              this.errorMessage=null;
            }
          },
          error => {
            console.error('Error:', error);
            if (error && error.error && error.error.message === 'La relación ya existe.') {
              this.errorMessage = error.error.message;
              this.successMessage=null;
            } else {
              this.errorMessage = 'Error. Por favor, inténtalo de nuevo.';
              this.successMessage=null;

            }
          }
        );
      }
    }
  }

  closeAlert() {
    this.errorMessage = null;
    this.successMessage = null;
  }
}