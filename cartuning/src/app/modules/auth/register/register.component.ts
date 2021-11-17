import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../../../_services/alert.service';
import { AccountService } from '../../../_services/account.service'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    isLoading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]]
        });
    }

    async registerAsync() {
        if (this.registerForm.invalid)
            return;

        this.isLoading = true;

        try {
            await this.accountService.registerNewAsync(this.registerForm.value.email, this.registerForm.value.username, this.registerForm.value.password)
            this.showMessage("Account successfully created.")
        } catch (error)
        {
            this.showMessage(error.error)
        }
        
        this.isLoading = false;
    }

    showMessage(message)
    {
        this.snackBar.open(message, "[ x ]", {duration: 5000, horizontalPosition: "center", verticalPosition: "top"})
    }

    mustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // return if another validator has already found an error on the matchingControl
                return;
            }

            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }

        }
    }
}