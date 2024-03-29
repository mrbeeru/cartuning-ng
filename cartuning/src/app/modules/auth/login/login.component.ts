import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { faFacebook, faGoogle, faDiscord } from '@fortawesome/free-brands-svg-icons';

import {AlertService} from '../../../_services/alert.service'
import {AccountService} from '../../../_services/account.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faFacebook = faFacebook;
  faGoogle = faGoogle;
  faDiscord = faDiscord;

  loginForm: FormGroup;
  isLoading = false;
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
  this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
  });

  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/account/user';
}

  async loginAsync() {

    // stop here if form is invalid
    if (!this.loginForm.valid)
        return;
    
    this.isLoading = true;
    
    try {
      await this.accountService.loginNewAsync(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
    } catch (err)
    {
      console.log(err);
    }

    this.isLoading = false;

    // this.accountService.login(this.f.username.value, this.f.password.value)
    //     .pipe(first())
    //     .subscribe(
    //         data => {
    //           this.loading = false;
    //           if(data)
    //             this.router.navigate([this.returnUrl]);
              
    //             // this.router.navigate(['user/profile']);
    //         },
    //         error => {
    //             console.log(error);
    //             this.loading = false;
    //             this.alertService.error(error.error.message);
    //       });
  }

}
