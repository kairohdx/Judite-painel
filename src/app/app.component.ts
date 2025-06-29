import { Component } from '@angular/core';
import { User } from './shared/models/user.model';
import { AuthContextService } from './shared/services/authContext.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Judite Admin Panel';
  constructor(public authContext: AuthContextService) {}

  logout() {
    this.authContext.logout();
  }

}