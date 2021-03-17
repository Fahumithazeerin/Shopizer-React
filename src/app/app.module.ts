/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';

import { CoreModule } from './@core/core.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthInterceptor } from './pages/shared/interceptors/auth.interceptor';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { NbMomentDateModule } from '@nebular/moment';
import { GlobalHttpInterceptorService } from './pages/shared/interceptors/globalError.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { ImageBrowserComponent } from './@theme/components/image-browser/image-browser.component';
import { GlobalErrorHandler } from './pages/shared/classes/error-handler/global-error-handler';
import { FileManagerModule } from 'ng6-file-man';
import { ResetPasswordComponent } from './pages/auth/resetpassword/reset.component';
import { CustomComponent } from './pages/custom-component/custom.component';
import { EqualValidator } from './pages/shared/validation/equal-validator';
import { TinyMCEComponent } from './@theme/components/tiny-mce/tiny-mce.component';
import { ManageAddComponent } from './pages/customers/manageoptions/add.component';
import { ManageListComponent } from './pages/customers/manageoptions/list.component';
import { OptionListComponent } from './pages/customers/options/list.component';
import { OptionsAddComponent } from './pages/customers/options/add.component';
import { ValueAddComponent } from './pages/customers/optionsvalue/add.component';
import { ValueListComponent } from './pages/customers/optionsvalue/list.component';
//import { CountryOrdersComponent } from './pages/shared/wigets/e-commerce/country-orders/country-orders.component';
//import { CountryOrdersChartComponent } from './pages/shared/wigets/e-commerce/country-orders/chart/country-orders-chart.component';

@NgModule({
  declarations: [
    AppComponent, 
    ResetPasswordComponent, 
    EqualValidator, 
    ImageBrowserComponent, 
    TinyMCEComponent,
    CustomComponent,
    ManageAddComponent,
    //ManageListComponent, //TODO
    //OptionListComponent, //TODO
    ValueAddComponent,
    OptionsAddComponent,
    //ValueListComponent, //TODO
    //CountryOrdersComponent, //TODO
    //CountryOrdersChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbDateFnsDateModule.forRoot({
      format: 'yyyy-MM-dd',
    }),
    NbMomentDateModule,

    NgbModule,
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot(),
    FileManagerModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    // {
    //   provide: ErrorHandler,
    //   useClass: GlobalErrorHandler,
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptorService,
      multi: true,
    },
    TranslateService
  ],
})
export class AppModule {
}



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
