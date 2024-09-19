import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../Interfaces/user-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-me',
  standalone: true,
  imports: [],
  templateUrl: './me.component.html',
  styleUrl: './me.component.css'
})
export class MeComponent implements OnInit {

  constructor( private us: UserService , private router: Router) {}

  user: User | null = null;

  ngOnInit(): void {
    this.getUserData();
    
  }
  Logout() {
    this.router.navigate(['/login']);
    }


    getUserData() {
      
        this.us.getData().subscribe(
          response => {
            this.user = response; // Accede a la propiedad 'user' de la respuesta
            console.log(response); //
          },
          (error) => {
            console.error(error);
          }
        );
      
    }  

}
