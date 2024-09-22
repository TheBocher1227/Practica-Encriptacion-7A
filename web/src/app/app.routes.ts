import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CodigoComponent } from './components/codigo/codigo.component';
import { loginGuard } from './guards/login.guard';
import { authGuard } from './guards/auth.guard';
import { SensoresComponent } from './components/sensores/sensores.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'verificar-codigo', component: CodigoComponent},
    { path: 'register', component: RegisterComponent },
    {path:'sensores',component: SensoresComponent},
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
    { path: 'navbar', loadComponent: () => import("./components/navbar/navbar.component").then(n => n.NavbarComponent),canActivate: [authGuard],
        children:[
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', loadComponent: () => import("./components/dashboard/dashboard.component").then(n => n.DashboardComponent),},
            { path: 'sensores', loadComponent: () => import("./components/sensores/sensores.component").then(n => n.SensoresComponent),},
            { path: 'me', loadComponent: () => import("./components/me/me.component").then(n => n.MeComponent),},
        ]   
    },
];
