import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Message } from '../../Interfaces/message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ RouterLink, CommonModule, ReactiveFormsModule, FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private ls: LoginService, private route: Router) { }

  public form = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email]),
    password: new FormControl('', [ Validators.required, Validators.minLength(8)])
  })

  public msg: Message = {
    msg: "",
    token: "",
  }

  public message: string|null = null
  public errorMsg: string|null = null
  public emailError: Array<string>|null = null
  public passwordError: Array<string>|null = null

  get email() {
    return this.form.get('email') as FormControl
  }

  get password() {
    return this.form.get('password') as FormControl
  }

  public error: any = null;

  Login() {
    this.ls.LogIn(this.email.value, this.password.value).subscribe(
      (response) => {
        console.log(response)
        this.errorMsg = null
        this.error = null;
        this.msg.msg = response.msg
        localStorage.setItem('token', response.token)
        setTimeout(() => {
          this.route.navigate(['/verificar-codigo'])
        }, 2000)
      }, (error) => {
        this.msg.msg = ""
        this.errorMsg = error.error
        this.error = error.verificacion;
      }
    )
  }

}
