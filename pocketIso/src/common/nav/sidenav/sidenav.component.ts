import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../common/auth/auth.service';
import { ChangePasswordDialogComponent } from '../../../common/auth/change-password-dialog/change-password-dialog.component';
import { UserInfoDialogComponent } from '../../../common/auth/user-info-dialog/user-info-dialog.component';
import { NAV_DATA } from '../../../common/const/nav-list';
import { Role } from '../../../common/enums/user-role-codes';
import { NavItem } from '../../../common/models/nav-item.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;

  fillerNav = NAV_DATA;
  isAuthenticated = false;
  private userSub: Subscription | undefined;
  private role = '';

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authService: AuthService, public dialog: MatDialog) {
    this.filterNavBasedOnUserRole();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  changePassword() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe();
  }

  openUserInfo() {
    const dialogRef = this.dialog.open(UserInfoDialogComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe();
  }

  filterNavBasedOnUserRole() {
    this.role = this.authService.getRole();

    let tempNavItems: NavItem[] = [];
    if (this.role === Role.User) {
      this.fillerNav.forEach(x => {
        if (x.role === Role.User) {
          if (x && x.children && x.children.length > 0) {
            let tempNavItemsChildren: NavItem[] = [];
            x.children.forEach(c => {
              if (c.role === Role.User) {
                tempNavItemsChildren.push(c);
              }
            });

            x.children = tempNavItemsChildren;
          }
          tempNavItems.push(x);
        }
      })
    } else if (this.role === Role.Admin) {
      this.fillerNav.forEach(x => {
        if (x.role === Role.User || x.role === Role.Admin) {
          if (x && x.children && x.children.length > 0) {
            let tempNavItemsChildren: NavItem[] = [];
            x.children.forEach(c => {
              if (c.role === Role.User || c.role === Role.Admin) {
                tempNavItemsChildren.push(c);
              }
            });

            x.children = tempNavItemsChildren;
          }
          tempNavItems.push(x);
        }
      });
    } else if (this.role === Role.SuperAdmin) {
      this.fillerNav.forEach(x => {
        if (x.role === Role.User || x.role === Role.Admin || x.role === Role.SuperAdmin) {
          if (x && x.children && x.children.length > 0) {
            let tempNavItemsChildren: NavItem[] = [];
            x.children.forEach(c => {
              if (c.role === Role.User || c.role === Role.Admin || c.role === Role.SuperAdmin) {
                tempNavItemsChildren.push(c);
              }
            });

            x.children = tempNavItemsChildren;
          }
          tempNavItems.push(x);
        }
      });
    }

    this.fillerNav = tempNavItems;
  }
}
