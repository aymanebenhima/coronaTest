import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  supportLanguages = ['ar', 'fr'];
  
  constructor(public translateService: TranslateService) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang('fr');

    // const browserlang = this.translateService.getBrowserLang();
    // this.translateService.use(browserlang);
  }


  ngOnInit(): void {
  }

}
