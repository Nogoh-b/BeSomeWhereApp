import { Component } from '@angular/core';
import { TranslationService } from 'src/app/service/translation/translation.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {
  selectedLanguage: string;

  languages = [
    { value: 'fr', label: 'Français', flagClass: 'fr' },
    { value: 'en', label: 'English', flagClass: 'gb' },
  ];
  constructor(private translationService: TranslationService) {
    this.selectedLanguage = translationService.getLanguage();
  }


  changeLanguage(lang = 'en'): void {
    this.selectedLanguage  = lang
    this.translationService.setLanguage(this.selectedLanguage);
  }
}
