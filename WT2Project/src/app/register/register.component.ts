import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm = new FormGroup(
    {
      uname: new FormControl(),
      password: new FormControl(),
    }
  );

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private appService: AppService
  ) { this.mainForm(); }

  get myForm() {
    return this.createForm.controls;
  }

  submitted = false;
  createForm: FormGroup;

  ngOnInit(): void {
  }

  get uname() {
    return this.createForm.controls['uname'];
  }

  get password() {
    return this.createForm.controls['password'];
  }

  //Formhoz validációs megvalósítások
  mainForm() {
    this.createForm = this.formBuilder.group({
      uname: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]],
    });
  }

  //Regisztráció adatok felvitelének lekezelése
  onSubmit() {
    this.submitted = true;
    if (!this.createForm.valid) {
      alert('Registration failed. Please check the requirements!');
      return false;

    } else {
      this.appService.createUser(this.createForm.value).subscribe(
        (res) => {
          alert('Registration successful.');
          this.ngZone.run(() => this.router.navigateByUrl('/login'));
        }, (error) => {
          console.log(error);
        });
    }
  }
}
