import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isUser: boolean = false;

  title = 'DublinCityMotors';

  constructor(private auth: AuthService) {}
  ngOnInit(): void {
    this.auth.userToken$.subscribe((token) => {
      this.isUser = !!token; // Show navbar/footer if token exists
    });
  }
}
