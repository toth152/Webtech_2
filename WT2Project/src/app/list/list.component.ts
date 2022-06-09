import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { Router } from '@angular/router';
import { AppService } from '../app.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  //Munkavállalók tömbje
  Employee: any = [];
  
  user = new User();
  username: string;

  constructor(private router: Router,
              private appService: AppService)
  {
    this.getEmployee();
    this.getUser();
  }

  ngOnInit(): void {
  }

  //Munkavállaló lekérdezése
  getEmployee() {
    this.appService.getEmployee().subscribe((data) => {
      this.Employee = data;
    });
  }

  //A felhasználó csak bejelentkezés esetén tud a menübe navigálni, és munkavállalót kezelni
  getUser(){
    if (this.appService.getLoggedInUser().uname == null)
    {
      //Egyedi navigációnál a login felület fogadja
      this.router.navigate(['/login']);
    }

    this.user = this.appService.getLoggedInUser();
    this.username = JSON.stringify(this.user.uname);
  }

}
