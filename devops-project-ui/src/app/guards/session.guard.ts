import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class SessionGuard implements CanActivate {

    sessionToken: string = '';

    constructor(private router: Router) { }

    canActivate(): boolean {
        // Verificar la sesión del usuario aquí

        const token = localStorage.getItem('token');

        if (token) {
            return true; // Permite el acceso a la ruta
        } else {
            alert('No hay una sesión valida');
            this.router.navigate(['/login']); // Redirecciona a la página de inicio de sesión
            return false; // Bloquea el acceso a la ruta
        }
    }

}
