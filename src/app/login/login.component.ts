import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;
  error: string = null;
  isLoading: boolean = false;
  constructor(private router: Router) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }
  getStoredData() {
    return JSON.parse(localStorage.getItem('register')) || [];
  }

  onSubmit() {
    if(this.form.valid){
    console.log(this.form.value)
    let user = this.getStoredData();
    user.forEach(e => {
      console.log(e.password)
      console.log(this.form.value.password);
      
      if (e.password == this.form.value.password && e.email == this.form.value.email || e.mobile_no == this.form.value.mobile_no) {
        localStorage.setItem('isLogin', 'true')
        localStorage.setItem('curentUser', JSON.stringify(e))
        this.router.navigate(['/dashbaord'])

        //alert
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successfully...",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        this.error = "Invalid Username Or Password"
        setTimeout(() => {
          this.error = null;
        }, 5000) } });
      }else{
        this.form.markAllAsTouched()
      }
  }

}
