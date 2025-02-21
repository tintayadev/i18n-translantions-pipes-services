# Angular 19 Internationalization (i18n) Using Pipes

![Project Screenshot](img/sample.gif)

This project demonstrates **internationalization (i18n)** in **Angular 19**, using:
- **Standalone components**
- **Custom pipes for translations**
- **Services for managing state**
- **RxJS Observables & Subscriptions**
- **Modern HttpClient integration (`provideHttpClient()`)**
- **Automatic and manual change detection**

This project was based on this blog I found by [Tushar Ghosh’s blog post](https://tusharghosh09006.medium.com/angular-internationalization-using-pipe-5074b42c357f) ;D


## **Project Overview**
### Features
- **Dynamic Language Switching**: Supports English, Spanish, and French :3
- **Custom Pipe for i18n**: Uses `i18n.pipe.ts` to transform text dynamically
- **Standalone Components**: No `AppModule`; components are self-contained
- **RxJS Observables & Subscriptions**: Handles async operations for fetching translations
- **Translation Files in JSON**: Stored in `assets/langs/` for easy updates
- **Manually Triggering Change Detection**: Uses `ApplicationRef.tick()` for UI updates


# **Key Angular 19 Concepts Used in This Project**
## **1. Standalone Components**
Angular 19 **removes the need for `NgModule`**. Components **declare their dependencies directly**

**Example: `app.component.ts`**
```typescript
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [LanguageSwitcherComponent, HomeComponent],
})
export class AppComponent {}
```
**Why?**
- Reduces **boilerplate code**.
- Makes components **truly modular**.
- **Faster compilation** since no `NgModule` metadata processing is required.


## **2️. Pipes in Angular (Pure vs. Impure Pipes)**
### **What is a Pipe?**
A **pipe** is a feature in Angular used to **transform displayed data** in templates  
In this project, the **custom `i18n.pipe.ts`** translates text dynamically

### **Pure vs. Impure Pipes**
| Type | Behavior | Example |
|------|----------|---------|
| **Pure Pipe** | Runs only if input **changes** | `date`, `currency` |
| **Impure Pipe** | Runs **on every change detection cycle** | Custom i18n pipe |

### **Why Use an Impure Pipe for i18n?**
Since language changes **don't affect the input value**, we must **force Angular to re-evaluate** the pipe.

**Custom Pipe Code (`i18n.pipe.ts`)**
```typescript
@Pipe({
  name: 'i18n',
  standalone: true,
  pure: false, // Runs every change detection cycle
})
export class I18nPipe implements PipeTransform {
  constructor(private i18nService: I18nService) {}

  transform(phrase: string, variables?: any): string {
    return this.i18nService.getTranslation(phrase, variables);
  }
}
```
**Why Use Pipes?**
- **Cleaner templates** (`{{ 'WELCOME' | i18n }}` instead of calling a function).
- **Works dynamically** with language switching.


## **3️. Services & Dependency Injection (`Injectable`)**
### **What Are Services in Angular?**
A **service** is a **reusable, singleton class** that contains logic **shared across multiple components**.

### **Dependency Injection (`@Injectable`)**
Angular **automatically provides** services when requested.

**Example: `i18n.service.ts`**
```typescript
@Injectable({
  providedIn: 'root', // Singleton instance of this service
})
export class I18nService {
  constructor(private http: HttpClient, private ref: ApplicationRef) {}
}
```
**Why Use Services?**
- **Centralized logic** for managing translations.
- **Better modularity** → UI logic is separate from business logic.
- **Reduces redundancy** → Any component can request translations.


## **4️. Observables & Subscriptions**
### **What Are Observables?**
- **Observables** are a **core concept in RxJS** that allow handling **async events** (like HTTP requests).
- Unlike Promises, **Observables can emit multiple values over time**.

### **Using Observables for i18n**
**Fetching Translations in `i18n.service.ts`**
```typescript
private loadTranslations(lang: string): void {
  const langFilePath = `assets/langs/${lang}.json`;
  this.http.get(langFilePath).subscribe({
    next: (data: any) => {
      this.data = data;
      this.ref.tick(); // Manually trigger UI updates
    },
    error: (error) => {
      console.error(`Error loading language file: ${langFilePath}`, error);
    }
  });
}
```
**Why Use Observables Instead of Promises?**
- **More powerful** (supports multiple emissions).
- **Automatic cleanup** (Subscriptions can be unsubscribed).


## **5️. Manually Triggering Change Detection (`tick()`)**
### **Why Use `ApplicationRef.tick()`?**
- Angular **does not always detect when an async operation updates the UI**.
- `tick()` **forces change detection**, ensuring the UI updates instantly.
