import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CarBrand } from '../../_services/tuning.service';

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

  }

  ngOnInit(): void {
    this.initCarFormGroup();
  }

  initCarFormGroup()
  {
    this.carFormGroup = this.formBuilder.group({
      name: [this.carBrand?.name],
      iconPath: [this.carBrand?.iconPath]
    });

    this.carFormGroup.valueChanges.subscribe(x => this.carFormValueChanges(x))

  }

  carFormValueChanges(value)
  {
    let output : CarBrand = {
      name: value.name,
      iconPath: value.iconPath,
      models: [],
    }

    this.carBrandEdited.emit(output);
  }

}
