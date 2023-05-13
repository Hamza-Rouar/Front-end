import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signUpForm!:FormGroup;

  constructor(private fb:FormBuilder, private http: HttpClient, private router: Router){}

  ngOnInit(): void {
    this.signUpForm=this.fb.group({
      fullName:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
      mobile:['' ]
      
    })
  }

  onSignUp(){
    this.http.post<any>("http://localhost:3000/admin", this.signUpForm.value).subscribe(res=>
    { 
      alert('Sign up sucessfull !');
      this.signUpForm.reset();
      this.router.navigateByUrl('/login')
      },
      err=>{ alert ('Somthing is wrong !')}
    )}

}
