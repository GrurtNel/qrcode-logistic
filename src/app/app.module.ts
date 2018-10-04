import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/signin/signin';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpService, HttpErrorService } from './x/http/http.service';
import { OrderInfoPage } from '../pages/order-info/order-info';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    OrderInfoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    OrderInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpService,
    BarcodeScanner,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorService,
      multi: true
    },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
