import { bootstrapApplication } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { AppComponent } from './app/app.component';
import { todoReducer } from './app/store/todo.reducer';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, {
  providers: [...appConfig.providers, provideStore({ todos: todoReducer })],
}).catch((err) => console.error(err));
