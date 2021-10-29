import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CarBrand } from '../tuning.component';

@Component({
  selector: 'app-tuning-edit-dialog',
  templateUrl: './tuning-edit-dialog.component.html',
  styleUrls: ['./tuning-edit-dialog.component.css']
})
export class TuningEditDialogComponent implements OnInit {

  method: string;
  editObject: any;

  constructor(
    public dialogRef: MatDialogRef<TuningEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any) {
      this.method = data.method;
      this.editObject = data.editObject;
    }

  ngOnInit(): void {
    console.log(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.dialogRef.close(this.editObject);
  }

  carBrandEdited($event : CarBrand)
  {
    this.editObject = $event;
  }
}
