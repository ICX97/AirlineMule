import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private router:Router) { }

  ngOnInit(): void {
    
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required,Validators.minLength(3)]),
      password: new FormControl(null, [Validators.required,Validators.minLength(3)]),
    });
  }
  ucitati(){
    if(localStorage.getItem('prijava')==null){return true;}else return false;
  }
  onSubmit(){
    if(this.form.value.username=='admin'&&this.form.value.password=='admin'){
      localStorage.setItem('prijava','admin');
    }
  }

  odjaviSe(){
    localStorage.clear();
  }

}
