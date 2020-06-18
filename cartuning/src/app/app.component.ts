import { Component, ViewEncapsulation, HostListener, ElementRef, ViewChild } from '@angular/core';
import { faFacebookF, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { Router, NavigationEnd} from '@angular/router';

import { AccountService } from './_services/account.service'


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

  public test = false;

  /**
   *
   */
  constructor(
    private router: Router, 
    private accountService: AccountService) {

  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
}


  logout(){
    this.accountService.logout();
    this.test = true;
  }
  
  @ViewChild('matTab', { read: ElementRef }) matTab: ElementRef;

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    // var matGroupHeader = this.matTab.nativeElement.childNodes[0];

    // if ($event.target.scrollingElement.scrollTop < 40){
    //   matGroupHeader.style.background='rgba(0, 0, 0, 0.9)';
    // } else {
    //   matGroupHeader.style.background='rgba(0, 0, 0, 0.9)';
    // }
  } 
}
