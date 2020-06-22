import { Injectable, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { TranslateServiceRef } from './translate.types';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomTranslateService {
  private defaultLanguage: string;

  constructor(
    @Inject(TranslateService) private ts: TranslateService,
    @Inject(CookieService) private cookieService: CookieService,
  ) {
    this.defaultLanguage = 'sr'; // Fallback if cookie doesn't exist

    if (this.cookieService.check(environment.languageCookieName)) {
      this.defaultLanguage = this.cookieService.get(
        environment.languageCookieName
      );
      this.defaultLanguage = this.defaultLanguage.slice(this.defaultLanguage.indexOf('=') + 1, this.defaultLanguage.indexOf('=') + 3);
    }

    this.ts.setDefaultLang(this.defaultLanguage); // Fallback language if translation doesn't exist
    this.ts.use(this.defaultLanguage); // Set defaultLanguage as default
  }

  public get defaultLang(): string {
    return this.defaultLanguage;
  }

  public get translateService(): TranslateServiceRef {
    return (this.ts as TranslateServiceRef);
  }

  changeLanguage(prefix: string): Observable<any> {
    this.cookieService.set(environment.languageCookieName, prefix);
    return this.ts.use(prefix);
  }

  get(key: string | string[], interpolateParams?: Object): Observable<string> {
    return this.ts.get(key, interpolateParams);
  }
}
