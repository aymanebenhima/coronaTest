import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  supportLanguages = ['ar', 'fr'];
  constructor(private router: Router, public translateService: TranslateService) { 
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('fr');

    // const browserlang = this.translateService.getBrowserLang();
    // this.translateService.use(browserlang);
  }

/*   setLang(lang: string) {
    this.translateService.use.(lang);
  } */
  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0);
  });
  }

}
