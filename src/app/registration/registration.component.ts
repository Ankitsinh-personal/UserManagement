import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  datalist:any;
  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/user').subscribe( (res) => {
      console.log("data is:",res)
      this.datalist = res;
    })
  }

  signupdata(data:any)
  {
    this.http.post('http://localhost:8000/user',data).subscribe((res)=>{
      console.log("data stored")
    })
    this.router.navigate(['/login'])
  }

}
