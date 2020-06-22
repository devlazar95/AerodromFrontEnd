import { Component, OnInit } from '@angular/core';
import { CustomTranslateService } from 'src/app/services/custom-translate-service.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'main-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  languages = [{languageValue:"sr", languageName:"Srpski"}, { languageValue:"en",languageName:"Engleski" }];
  lanuagesTmp: any;
  defaultLang = "Serbian";
  defaultLangShort = "sr";
  
  constructor(
    private customTranslateService: CustomTranslateService,
    private cookieService: CookieService,
  ) {
    console.log("Construct");
  }

  ngOnInit() {
    console.log("Initial");
    this.defaultLangShort = this.cookieService.get(
      environment.languageCookieName
    );
    if (this.defaultLangShort === null || this.defaultLangShort === undefined || this.defaultLangShort === "") {
      this.defaultLangShort = "en";
      this.defaultLang = "English";
    }

    this.setLanguage(this.defaultLangShort);
    this.lanuagesTmp = this.languages.find(element => element.languageValue === this.defaultLangShort);
    this.changeLanguages(this.lanuagesTmp);
  }
  

  setLanguage(lang: any) {
    switch (lang) {
      case "sr":
        this.defaultLangShort = "sr";
        break;
      case "en":
        this.defaultLangShort = "en";
        break;
    }
  }

  changeLanguages(lang: any) {
    this.defaultLang = lang.languageName;
    switch (lang.languageValue) {
      case "sr":
        this.customTranslateService.changeLanguage("sr");
        break;
      case "en":
        this.customTranslateService.changeLanguage("en");
        break;
    }
  }

}
