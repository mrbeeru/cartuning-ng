import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarGeneration } from '../tuning.component';

@Component({
  selector: 'app-car-make-edit',
  templateUrl: './car-make-edit.component.html',
  styleUrls: ['./car-make-edit.component.css']
})
export class CarMakeEditComponent implements OnInit {

  @Input() carMake : CarGeneration;
  @Output() carMakeEdited =  new EventEmitter<CarGeneration>();

  carMakeFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) 
  {

  }

  ngOnInit(): void {
    this.initCarMakeFormGroup()
  }

  initCarMakeFormGroup()
  {
    this.carMakeFormGroup = this.formBuilder.group({
      startYear: [this.carMake?.startYear],
      endYear: [this.carMake?.endYear],
      icon: [this.carMake?.icon],
    });

    this.carMakeFormGroup.valueChanges.subscribe(x => this.carFormValueChanges(x))

  }

  carFormValueChanges(value)
  {
    let output : CarGeneration = {
      startYear: value.startYear,
      endYear: value.endYear,
      icon: value.icon,
    }

    this.carMakeEdited.emit(output);
  }

}
