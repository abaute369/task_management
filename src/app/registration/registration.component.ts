import { Task } from './../states/Task.model';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  isLoading: boolean = false;
  form: FormGroup;
  error: string = null;
  router: Router = inject(Router)
  sameEmail = null;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile_no: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirm_password: new FormControl('', [Validators.required])
    })
  }

  getStoredData() {
    return JSON.parse(localStorage.getItem('register')) || [];
  }

  storeData(data) {
    return localStorage.setItem('register', JSON.stringify(data))
  }

  onSubmit() {
    if (this.form.valid && this.form.get('password').value == this.form.get('confirm_password').value) {
      this.chechAlreadyRegister(this.form.value.email)
      if (!this.sameEmail) {
        console.log(this.form.value)
        let users = this.getStoredData();
        users.push(this.form.value);
        this.storeData(users);
        alert("You Successfully Registered...")
        this.router.navigate(['/login'])
      } else {
        this.error = "Email Already Registered"
        setTimeout(() => {
          this.error = null;
        }, 5000)
      }
    }else{
      this.form.markAllAsTouched()
    }

  }

  chechAlreadyRegister(email: string) {
    let registerUser: any = this.getStoredData()
    registerUser.forEach((e) => {
      if (e.email == email) {
        this.sameEmail = e.email;
        console.log("same email  conditions")
        setTimeout(() => {
          this.sameEmail = null
        }, 10000)
      }
      // else{
      //   this.sameEmail = null
      //   console.log("same email null conditions")
      // }
    })
  }


}
