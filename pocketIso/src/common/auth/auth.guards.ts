import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map, take } from "rxjs/operators";
import { Role } from "../enums/user-role-codes";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.user.pipe(
            take(1),
            map(user => {
                const isAuth = !!user;

                if (isAuth) {
                    return this.checkRoleUserLogin(route, state);
                }
                return this.router.createUrlTree(['/auth']);
            }));
    }

    checkRoleUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
        const userRole = this.authService.getRole();

        if (!userRole) {
            return false;
        }

        let roles = '';

        if (userRole === Role.SuperAdmin) {
            roles = `${Role.SuperAdmin},${Role.Admin},${Role.User}`;
        } else if (userRole === Role.Admin) {
            roles = `${Role.Admin},${Role.User}`;
        } else if (userRole === Role.User) {
            roles = `${Role.User}`;
        }

        if (route.data['role'] && !roles.includes(route.data['role'])) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}