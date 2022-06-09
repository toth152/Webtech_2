import { Component, NgZone, OnInit } from '@angular/core';
import { User } from '../model/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  //Egyedi pattern a munkavállaló nevéhez (csak az angol ABC betűit tartalmazhatja)
  patternForName = /^[A-Za-z][A-Za-z\s]*$/;
  
  user = new User();
  username: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private appService: AppService
  )
  {
    this.mainForm();
    this.getUser();
  }

  get myForm() {
    return this.createForm.controls;
  }

  submitted = false;
  createForm: FormGroup;

  ngOnInit(): void {
  }

  //Formhoz validációs megvalósítások (mindegyik kötelező, némelyik egyedi megkötésekkel)
  mainForm() {
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.patternForName)]],
      position: ['', [Validators.required]],
      idCard: ['', [Validators.required, Validators.pattern('^[0-9]{6}[A-Z]{2}')]],
      salary: ['', [Validators.required, Validators.pattern('^-?(0|[1-9]\\d*)?$')]]
    });
  }

  //Formba felvitt adatok lekezelése
  onSubmit() {
    this.submitted = true;
    //Nem valid form esetén felhasználó tájékoztatása felugró ablakban
    if (!this.createForm.valid) {
      alert('Add failed. Please check the requirements!');
      return false;
    } else {
      //Helyes adatok begépelésénél createEmployee() metódus meghívása
      this.appService.createEmployee(this.createForm.value).subscribe(
        (res) => {
          //Felhasználó tájékoztatása a sikerességről, majd a munkavállalók listájára való navigáció
          alert('Success.');
          this.ngZone.run(() => this.router.navigateByUrl('/list'));
        }, (error) => {
          alert('Error' + error);
        });
    }
  }

  //A felhasználó csak bejelentkezés esetén tud a menübe navigálni, és munkavállalót kezelni
  getUser() {
    if (this.appService.getLoggedInUser().uname == null) {
      this.router.navigate(['/login']);
    }

    this.user = this.appService.getLoggedInUser();
    this.username = JSON.stringify(this.user.uname);
  }
}
