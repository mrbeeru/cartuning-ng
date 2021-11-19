import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarModel } from '../../_services/tuning.service';

@Component({
  selector: 'app-car-model-edit',
  templateUrl: './car-model-edit.component.html',
  styleUrls: ['./car-model-edit.component.css']
})
export class CarModelEditComponent implements OnInit {

  @Input() carModel : CarModel;
  @Output() carModelEdited =  new EventEmitter<CarModel>();

  carModelFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) 
  {

  }

  ngOnInit(): void {
    this.initCarModelFormGroup()
  }

  initCarModelFormGroup()
  {
    this.carModelFormGroup = this.formBuilder.group({
      name: [this.carModel?.name],
      iconPath: [this.carModel?.iconPath]
    });

    this.carModelFormGroup.valueChanges.subscribe(x => this.carFormValueChanges(x))

  }

  carFormValueChanges(value)
  {
    let output : CarModel = {
      name: value.name,
      iconPath: value.iconPath,
      generations: [],
    }

    this.carModelEdited.emit(output);
  }

}
