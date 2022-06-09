import { Component, NgZone, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user = new User();

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private appService: AppService
  ) {}

  ngOnInit(): void {
  }

  

  //Kijelentkezés metódus, majd login oldalra navigálás
  logout(){
    this.user = new User();
    this.appService.setLoggedInUser(this.user);
    this.router.navigate(['/login']);
  }

  //Navigációs metódus (/add)
  navigateToAdd() {
    this.router.navigate(['/add']);
  }

}
