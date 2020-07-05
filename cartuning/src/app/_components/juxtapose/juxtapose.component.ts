import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-juxtapose',
  templateUrl: './juxtapose.component.html',
  styleUrls: ['./juxtapose.component.css'],
})
export class JuxtaposeComponent implements OnInit {

  beforeIMG;
  afterIMG;

  @Input() imgWidth: number;
  @Input() imgHeight: number;
  @Input() snapPercent: number = 2;

  @Input() beforeImageSrc: string;
  @Input() afterImageSrc: string;
  @Input() beforeCaption: string;
  @Input() afterCaption: string;

  constructor() { }

  
  ngOnInit(): void {
    this.beforeIMG = document.querySelector("figure");
    this.afterIMG = document.querySelector("figcaption");

    this.beforeIMG.addEventListener("mousemove", this.trackLocation.bind(this), false);
  }


  trackLocation(e) {
  	var rect = this.beforeIMG.getBoundingClientRect();
    var position = ((e.pageX - rect.left) / this.beforeIMG.offsetWidth)*100;
    
  	if (position > 100 - this.snapPercent)
      this.afterIMG.style.width = 100 + "%"; 
    else if (position < this.snapPercent)
      this.afterIMG.style.width = 0;
    else 
      this.afterIMG.style.width = position + "%"; 
  }

}
