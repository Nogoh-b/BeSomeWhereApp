// translation.service.ts

import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const LANG_STORAGE_KEY = 'selectedLanguage';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations: { [lang: string]: { [key: string]: string } } = {};
  currentLanguage: string;
  languageChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http: HttpClient) {
    this.currentLanguage = localStorage.getItem(LANG_STORAGE_KEY) || 'fr';
    this.loadTranslations(); // Charger les nouvelles traductions après le changement de langue

  }

  setLanguage(language: string): void {
    this.currentLanguage = language;
    localStorage.setItem(LANG_STORAGE_KEY, language);
    // this.languageChanged.emit(language);
    this.loadTranslations(); // Charger les nouvelles traductions après le changement de langue
  }

  getLanguage(): string {
    return localStorage.getItem(LANG_STORAGE_KEY) || 'fr';
  }

  translate(key: string, variables?: { [key: string]: string }): string {
    let translation = this.translations[this.currentLanguage][key] || key;

    if (variables) {
      // Remplace les variables dans la traduction
      Object.keys(variables).forEach((variable) => {
        translation = translation.replace(new RegExp(`{{${variable}}}`, 'g'), variables[variable]);
      });
    }

    return translation;
  }

  private loadTranslations(): void {
    
    const langFile = `./assets/i18n/${this.currentLanguage}.json`;
    this.http.get(langFile).subscribe(
      (translations: { [key: string]: string }) => {
        console.log('translations111 ', translations)
        this.translations[this.currentLanguage] = translations;
        console.log(translations)
      },
      (error) => {
        console.error(`Error loading translation file (${langFile}):`, error);
      }
    );
  }
}
