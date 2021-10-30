import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarEngine } from '../tuning.component';

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
      hpStage1: [this.carEngine?.stage1?.stageHp],
      nmStage1: [this.carEngine?.stage1?.stageNm],
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
        stageHp: value.hpStage1,
        stageNm: value.nmStage1,
        price: value.priceStage1,
      }
    }

    this.carEngineEdited.emit(output);
  }
}
