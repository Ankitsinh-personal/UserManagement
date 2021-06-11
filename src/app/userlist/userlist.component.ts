import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UserServiceService } from "../user-service.service";
import { NgbPagination  } from "@ng-bootstrap/ng-bootstrap";
import * as $ from "jquery";

 
@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  datalist:any;
  passData:any;
  tempData:any;
  // page = 1;
  // pageSize = 10;

  page = 1;
  pageSize = 4;
  // collectionSize = COUNTRIES.length;
  collectionSize:any;
  // countries: Country[] = [];
  countries:any;

  constructor(private http:HttpClient, private router:Router, private modalService:NgbModal, private userService:UserServiceService) {
    // this.refreshCountries();
   }

  ngOnInit(): void
   {

    if(localStorage.getItem('username'))
    {
      this.router.navigate(['/userlist'])
    }
    else{
      this.router.navigate(['/login'])
    }
    this.http.get('http://localhost:8000/user').subscribe( (res)=>
    {
      console.log("get data:",res)
      // this.datalist = res;
      this.tempData = res;
      this.collectionSize = this.tempData.length;
      console.log("collection size:",this.collectionSize)
    })
  }

  refreshCountries() {
    this.datalist = this.tempData.map((item:any, i:any) => ({id: i + 1, ...item}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  open(content:any , item:any ) 
  {
    if(item === '')
    {
      console.log('create new user')
      this.modalService.open(content);
      this.passData = item;
    }
    else
    {
      console.log('edit user')
      this.modalService.open(content);
      this.passData = item;
    }
  }

  deleteUser(item:any){
    this.userService.deleteUser(item)
  }

  signupdata(data:any)
  {
    this.userService.signupdata(data)
  }
  logout(){
    this.userService.logout();
  }

}