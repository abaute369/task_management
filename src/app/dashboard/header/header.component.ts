import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor( private router:Router){}
  curentUser = {};
  
  logout(){
       localStorage.setItem('curentUser',JSON.stringify(this.curentUser))
       localStorage.setItem('isLogin','false')
        this.router.navigate(['/login'])
    }
  

  deleteConfirm(){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout it!"
    }).then((result) => {
      if (result.isConfirmed) {
       this.logout()
        Swal.fire({
          title: "LogOut!",
          text: "You Logout Successfully.",
          icon: "success"
        });
      }
    });
  }
}
