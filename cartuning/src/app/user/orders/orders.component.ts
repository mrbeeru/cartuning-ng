import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { Order } from 'src/app/_models/user';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

// import { MatTableModule} from '@angular/material/table';
// import { MatProgressBarModule} from '@angular/material/progress-bar';
// import { MatChipsModule } from '@angular/material/chips'
// import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OrdersComponent implements OnInit {
  loading : boolean;

  displayedColumns: string[] = ['order', 'status', 'summary', 'date',  'actions'];
  dataSource;

  constructor (
    private accountService: AccountService,
    private snackBar: MatSnackBar,
  ) { 
    
  }

  ngOnInit(): void {
    this.getOrders();
  }

  deleteOrder(order: Order){
    this.loading = true;
    this.accountService.deleteOrder(order)
    .pipe(first())
    .subscribe( 
      data => {
        
       this.getOrders();
        // this.alertService.success('Order placed', { keepAfterRouteChange: false, autoClose: true });

        this.snackBar.open('Order deleted!', 'x', {
          duration: 3000,
          verticalPosition: 'top'
        })

      },
      error => {
        console.log(error);
        // this.alertService.error(error);
        this.loading = false;
    });
  }

  getOrders(){
    this.accountService.getOrders().subscribe(x => {this.dataSource = new MatTableDataSource(x); this.loading = false;});
  }
}
