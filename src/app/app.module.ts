import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { SnakeComponent } from './components/snake/snake.component';
import { gameReducer } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SnakeComponent,
    StoreModule.forRoot({ game: gameReducer }),
    StoreDevtoolsModule.instrument({
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
