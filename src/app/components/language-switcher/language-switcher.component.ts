import { Component } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { CommonModule } from '@angular/common';
import { I18nPipe } from '../../pipes/i18n.pipe';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, I18nPipe],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss'
})
export class LanguageSwitcherComponent {
  constructor(private i18nService: I18nService) {}

  changeLng(lang: string) {
    this.i18nService.setLanguage(lang);
  }

}
