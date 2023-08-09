import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { AuthService } from './services/auth.service';
import { authReducer } from './shared/state/reducers/user.reducer';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    StoreModule.forRoot({ auth: authReducer }),
    ToastrModule.forRoot(),
    ReactiveFormsModule,

  ],
  providers: [AuthService, { provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})
export class AppModule { }
