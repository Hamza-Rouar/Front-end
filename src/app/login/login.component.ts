import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!:FormGroup;

  constructor(private fb:FormBuilder, private http: HttpClient, private router: Router, private auth:AuthService){}

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }

  onlogin(){
    this.auth.login();
    this.http.get<any>("http://localhost:3000/admin").subscribe(res=>{ 
      const user = res.find((u:any)=>{
      return u.email=== this.loginForm.value.email && u.password=== this.loginForm.value.password })
      if(user){
      alert('Login sucess !');
      this.loginForm.reset();
      this.router.navigateByUrl('/students')
      }
      else { alert ('User not found !');}  },

      err=>{ alert ('Somthing is wrong ! ')}
     )

}
}
