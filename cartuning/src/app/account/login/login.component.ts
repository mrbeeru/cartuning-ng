import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import {AlertService} from '../../_services/alert.service'
import {AccountService} from '../../_services/account.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
) { }

ngOnInit() {
  this.form = this.formBuilder.group({
      username: [''],
      password: ['']
  });

  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/account/user';
}

  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    
    // reset alerts on submit
    this.alertService.clear();
    
    // stop here if form is invalid
    if (this.f.username.value == null || this.f.username.value == '' ||
        this.f.password.value == null || this.f.password.value == ''  ) {
          this.alertService.error('Please fill in your credentials');
        return;
    }
    
    this.loading = true;
    
    this.accountService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
              this.loading = false;
              if(data)
                this.router.navigate([this.returnUrl]);
              
                // this.router.navigate(['user/profile']);
            },
            error => {
                console.log(error);
                this.loading = false;
                this.alertService.error(error.error.message);
          });
  }

}
