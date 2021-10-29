import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CarBrand } from '../tuning.component';

@Component({
  selector: 'app-car-brand-edit',
  templateUrl: './car-brand-edit.component.html',
  styleUrls: ['./car-brand-edit.component.css']
})
export class CarBrandEditComponent implements OnInit {

  @Input() carBrand : CarBrand;
  @Output() carBrandEdited =  new EventEmitter<CarBrand>();

  carFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) 
  {
    this.carFormGroup = formBuilder.group({
      name: [''],
      iconPath: ['']
    });

  }

  ngOnInit(): void {

    this.carFormGroup.valueChanges.subscribe(x => this.carFormValueChanges(x))
  }

  carFormValueChanges(value)
  {
    let output : CarBrand = {
      name: value.name,
      icon: value.iconPath,
      models: [],
    }

    this.carBrandEdited.emit(output);
  }

}
