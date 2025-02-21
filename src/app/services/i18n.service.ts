import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class I18nService {

  private data: any = {};
  private currentLanguage: string = 'en';

  constructor(private http: HttpClient, private ref: ApplicationRef) {
    this.setLanguage(localStorage.getItem('lang') || 'en');
  }

  public setLanguage(lang: string): void {
    localStorage.setItem('lang', lang);
    this.currentLanguage = lang;
    this.loadTranslations(lang);
  }

  public getTranslation(phrase: string, variables: any=null): string {
    if (this.data[phrase]) {
      let translated = this.data[phrase];
      if (variables) {
        Object.keys(variables).forEach((key) => {
          translated = translated.replace(`{${key}}`, variables[key]);
        });
      }
      return translated;
    }
    return phrase;
  }

  private loadTranslations(lang: string):void {
    const langFilePath = `assets/langs/${lang}.json`;
    this.http.get(langFilePath).subscribe({
      next: (data: any) => {
        this.data = data;
        this.ref.tick();
      },
      error: (error) => {
        console.error(`Error loading language file: ${langFilePath}`, error);
      }
    });


  }

}
