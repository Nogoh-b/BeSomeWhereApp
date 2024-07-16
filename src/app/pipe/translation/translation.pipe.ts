// translate.pipe.ts

import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslationService } from 'src/app/service/translation/translation.service';
@Injectable({
  providedIn: 'root',
})
@Pipe({
  name: 'translate',
  pure: false, // rendre le pipe impur

})
export class TranslatePipe implements PipeTransform {
  private subscription: Subscription;

  constructor(private translationService: TranslationService) {
    this.subscription = this.translationService.languageChanged.subscribe(() => {
      // Mettre à jour la traduction lorsque la langue change
    console.log(this.translationService.languageChanged)
      
    });
  }

  transform(key: string, variables?: { [key: string]: string }): string {
    let translation = this.translationService.translate(key, variables) || key;

    return translation;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
