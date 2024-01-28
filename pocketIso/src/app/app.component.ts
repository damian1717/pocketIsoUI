import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  title = 'pocketIso';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.autologin();
  }
}
