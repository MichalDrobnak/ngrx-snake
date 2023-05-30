import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SnakeComponent } from '@components';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { gameReducer } from '@reducers';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
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
