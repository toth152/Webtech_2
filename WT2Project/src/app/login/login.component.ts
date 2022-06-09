import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup(
    {
      uname: new FormControl(''),
      password: new FormControl('')
    }
  );

  //Felhasználók tömbje
  users: any = [];

  constructor(
    private router: Router,
    private appService: AppService
  ) {}

  ngOnInit(): void {}

  get form() { return this.loginForm.value; }

  //Összehasonlítás alapú bejelentkezés, és lekezelése
  onSubmit() {
    const loggedInUser = (JSON.stringify(this.loginForm.value.uname));
    const loggedInPassword = (JSON.stringify(this.loginForm.value.password));

    let match = false;
    this.appService.getUsers().subscribe((data) => {
      this.users = data;

      //Felhasználók között keres, majd pontos egyezőséget keres
      for (const user of this.users) {
        if (JSON.stringify(user.uname) === loggedInUser && loggedInPassword === JSON.stringify(user.password)) {
          match = true;
          this.appService.setLoggedInUser(user);
        }
      }

      //Ha talál megegyező adatokat -> bejelentkezik, és a menübe navigál
      if (match) {
        alert('Successful login.');
        this.router.navigate(['/menu']);

      }
      //Ha nincs egyezőség, felugró ablakban jelzi a felhasználónak a problémát
      else {
        alert('Invalid login credentials. Please try again!');
      }
    });
  }

}
