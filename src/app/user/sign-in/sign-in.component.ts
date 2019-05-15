import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

// add userService
import { UserService } from '../../shared/user.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  // we will inject this userService in app module
  constructor(private userService: UserService, private router:Router) { }

  // loginform
  model ={
    email:'',
    password:''
  };

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
serverErrorMessages:string;
  ngOnInit() {
  }

  onSubmit(form: NgForm){
  // called from user.ser.ts
  this.userService.login(form.value)  // form.value contains values enterd in form
  .subscribe(
    res => {
    this.userService.setToken(res['token']);
// to redirect user into userprofile
this.router.navigateByUrl('/userprofile')

    },
    err => {
this.serverErrorMessages = err.error.message;

    }
  )
  }


}
