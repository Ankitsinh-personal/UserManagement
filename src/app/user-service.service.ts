import { Injectable, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class UserServiceService implements OnInit {

  datalist:any;
  constructor(private router:Router, private http:HttpClient) { }
  
  ngOnInit(): void {
  }

  logindata(data:any)
  {
    this.http.get('http://localhost:8000/user').subscribe((res)=>
    {
      console.log("get data:",res)
      this.datalist = res;
    })

    for(var item in this.datalist)
    {
      console.log("username:",this.datalist[item].username)
      if(data.username == this.datalist[item].username)
      {
        if( data.password == this.datalist[item].password)
        {
          localStorage.setItem('username',this.datalist.username)
          localStorage.setItem('username',this.datalist.password)
          this.router.navigate(['/userlist'])
          console.log('valid data')
        }
      }
      else{
        console.log("data invalid")
        // this.router.navigate(['/registration'])
      }
    }
  }


  signupdata(data:any)
  {
    console.log('popup data:',data)
    if( data.id == undefined)
    {
      console.log("id is undefined so create post request");
      this.http.post('http://localhost:8000/user',data).subscribe( (res)=>{
        console.log("create user success:",res)
      })
      location.reload()
    }
    else
    {
      this.http.put('http://localhost:8000/user/'+data.id,data).subscribe( (res)=>{
        console.log("update data:",res)
      })
    }
  }

  deleteUser(item:any){
    this.http.delete('http://localhost:8000/user/'+ item.id).subscribe( (res)=>{
      console.log("delete success:",item.username)
    })
    location.reload()
  }

  logout()
  {
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
