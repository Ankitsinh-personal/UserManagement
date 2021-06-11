import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { UserServiceService } from "../user-service.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  datalist:any;
  constructor(private http:HttpClient, private router:Router, private userService:UserServiceService) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/user').subscribe((res)=>
    {
      console.log("get data:",res)
      this.datalist = res;
    })
  }
  logindata(data:any)
  {
    this.userService.logindata(data)
  }

}
