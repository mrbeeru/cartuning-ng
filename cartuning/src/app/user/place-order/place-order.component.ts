import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../_services/alert.service';
import { AccountService } from '../../_services/account.service';
import { first } from 'rxjs/internal/operators/first';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpEventType } from '@angular/common/http';


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
    console.log(this.form.value);
    this.accountService.placeOrder(this.form.value).subscribe(
      data => {
        if (data.type === HttpEventType.UploadProgress) {
          var progress = Math.round(100 * data.loaded / data.total);
        }

        if (data.type === HttpEventType.Response){
          if (data.status == 200){
              this.snackBar.open('Order successfully placed!', 'x', {
              duration: 3000,
              verticalPosition: 'top'
            })
          } 

          this.loading = false;
        }
      },
      error => {
        console.log(error);
        this.snackBar.open(error.error.message, 'x', {
          duration: 3000,
          verticalPosition: 'top'
        })
          // this.alertService.error(error);
          this.loading = false;
    });
   }

   public fileChangeEvent(fileInput: any){
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e : any) {
          this.form.value.ecuFile =  {
            metadata: {
              type: fileInput.target.files[0].type,
              size: fileInput.target.files[0].size,
              name: fileInput.target.files[0].name,
            },
            content: e.target.result
          };
      }.bind(this);

      reader.readAsDataURL(fileInput.target.files[0]);
  }
}
}
