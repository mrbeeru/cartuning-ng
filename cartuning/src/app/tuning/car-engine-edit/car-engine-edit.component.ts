import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarEngine } from '../../_services/tuning.service';

@Component({
  selector: 'app-car-engine-edit',
  templateUrl: './car-engine-edit.component.html',
  styleUrls: ['./car-engine-edit.component.css']
})
export class CarEngineEditComponent implements OnInit {

  @Input() carEngine : CarEngine;
  @Output() carEngineEdited =  new EventEmitter<CarEngine>();

  carEngineFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) 
  {

  }

  ngOnInit(): void {
    this.initCarEngineFormGroup();
  }

  initCarEngineFormGroup()
  {
    this.carEngineFormGroup = this.formBuilder.group({
      kind: [this.carEngine?.kind],
      name: [this.carEngine?.name],
      hp: [this.carEngine?.hp],
      nm: [this.carEngine?.nm],
      priceStage1: [this.carEngine?.stage1?.price],
      hpStage1: [this.carEngine?.stage1?.hp],
      nmStage1: [this.carEngine?.stage1?.nm],
    });

    this.carEngineFormGroup.valueChanges.subscribe(x => this.carEngineFormValueChanges(x))

  }

  carEngineFormValueChanges(value)
  {
    let output : CarEngine = {
      kind: value.kind,
      name: value.name,
      hp: value.hp,
      nm: value.nm,
      stage1: {
        hp: value.hpStage1,
        nm: value.nmStage1,
        price: value.priceStage1,
      }
    }

    console.log(output);

    this.carEngineEdited.emit(output);
  }
}
