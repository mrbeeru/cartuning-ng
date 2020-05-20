import { Component, ViewEncapsulation, HostListener, ElementRef, ViewChild } from '@angular/core';
import { faFacebookF, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class AppComponent {
  title = 'cartuning';
  faFacebook = faFacebookF;
  faYoutube = faYoutube;
  faInstagram = faInstagram;
  
  @ViewChild('matTab', { read: ElementRef }) matTab: ElementRef;

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    var matGroupHeader = this.matTab.nativeElement.childNodes[0];

    if ($event.target.scrollingElement.scrollTop < 40){
      matGroupHeader.style.background='rgba(0, 0, 0, 0.2)';
    } else {
      matGroupHeader.style.background='rgba(0, 0, 0, 0.9)';
    }
  } 
}
