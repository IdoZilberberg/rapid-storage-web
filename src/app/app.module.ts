import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { HttpClientModule } from '@angular/common/http';

import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {AppNavbarComponent} from './app-navbar/app-navbar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from './services/auth';
import {FilesService} from './services/files';

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    FilesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
