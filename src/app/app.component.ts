import { Component } from '@angular/core';
import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';
import { HomeComponent } from './components/home/home.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ LanguageSwitcherComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-i18n-pipe';
}
