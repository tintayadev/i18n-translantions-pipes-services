import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from '../services/i18n.service';

@Pipe({
  name: 'i18n',
  standalone: true,
  pure: false, // To ensure udpates when language changes
})
export class I18nPipe implements PipeTransform {
  constructor(private i18nService: I18nService) {}

  transform(phrase: string, variables?: any): string {
    return this.i18nService.getTranslation(phrase, variables);
  }

}
