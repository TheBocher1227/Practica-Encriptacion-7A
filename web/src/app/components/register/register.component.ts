import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { Message } from '../../Interfaces/message';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ RouterLink, CommonModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private rs: RegisterService, private router: Router) { }

  public form = new FormGroup({
    usuario: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  public msg: string|null = null
  public errorMsg: string|null = null
  public emailError: Array<string>|null = null
  public passwordError: Array<string>|null = null
  public nameError: Array<string>|null = null

  get usuario(){
    return this.form.get('usuario') as FormControl
  }
  get email(){
    return this.form.get('email') as FormControl
  }
  get password(){
    return this.form.get('password') as FormControl
  }

  registrar(){
    this.rs.register(this.usuario.value, this.email.value, this.password.value).subscribe(
      (response) => {
        this.errorMsg = null
        this.msg = response.msg

        alert('Cuenta registrada. Por favor, activa tu cuenta desde tu correo.');

        // Redirigir al login después de cerrar el popup
        this.router.navigate(['/login']);
      }, (error) => {
        this.msg = null
        console.log(error)
        this.errorMsg = error.msg
        console.log(this.errorMsg)

        if(error.data.name){
          this.nameError = []
          error.data.name.forEach((error:string) => {
            this.nameError?.push(error)
          });
        }
        if(error.data.email){
          this.emailError = []
          error.data.email.forEach((error:string) => {
            this.emailError?.push(error)
          });
        }
        if(error.data.password){
          this.passwordError = []
          error.data.password.forEach((error:string) => {
            this.passwordError?.push(error)
          });
        }

        console.log(error.data.name)
      }
    )
  }

}
