import { Component } from '@angular/core';
import { TranslationService } from 'src/app/service/translation/translation.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {
  selectedLanguage: string;

  constructor(private translationService: TranslationService) {
    this.selectedLanguage = translationService.getLanguage();
  }

  changeLanguage(): void {
    this.translationService.setLanguage(this.selectedLanguage);
  }
}
