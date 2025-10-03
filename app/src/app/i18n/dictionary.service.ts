import { Injectable } from '@angular/core';
import pt from './languages/pt.json';
import en from './languages/en.json';
import es from './languages/es.json';

type Lang = 'pt' | 'en' | 'es';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  private currentLang: Lang = 'pt';
  private dictionaries: Record<Lang, any> = { pt, en, es };

  setLanguage(lang: Lang) {
    this.currentLang = lang;
  }

  get(key: string): string {
    const parts = key.split('.');
    let value: any = this.dictionaries[this.currentLang];

    for (const part of parts) {
      if (value && part in value) {
        value = value[part];
      } else {
        return key;
      }
    }

    return value;
  }
}
