import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class loginGuard implements CanActivate {

  constructor(private router: Router, private ls: LoginService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    try {
      const  isLoged = await this.ls.verificarLogin().toPromise()
      return isLoged 
    } catch (error) {
      return this.router.createUrlTree([''])
    }
  }

};
