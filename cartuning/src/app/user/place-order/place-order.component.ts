import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/_services/alert.service';
import { AccountService } from 'src/app/_services/account.service';
import { first } from 'rxjs/internal/operators/first';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PlaceOrderComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required],
      engine: ['', Validators.required],
      clutch: [''],
      ecu: [''],
    });
  }

   // convenience getter for easy access to form fields
   get f() { return this.form.controls; }
  
   onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    
    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    this.accountService.placeOrder(this.form.value)
        .pipe(first())
        .subscribe(
            data => {
                // this.alertService.success('Order placed', { keepAfterRouteChange: false, autoClose: true });
                this.snackBar.open('Order successfully placed!', 'x', {
                  duration: 3000,
                  verticalPosition: 'top'
                })

                this.loading = false;
            },
            error => {
              console.log(error);
                // this.alertService.error(error);
                this.loading = false;
            });
     
   }

}
