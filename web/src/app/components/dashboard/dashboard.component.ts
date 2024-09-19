import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../Interfaces/user-interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ NavbarComponent, RouterLink ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor( private us: UserService ) {}


  ngOnInit(): void {
    
  }

}
