import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponentComponent } from './notfound-component/notfound-component.component';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { LoadingInterceptor } from './interceptor/loading.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { SpinnerComponent } from './spinner/spinner.component';
import { BlockUIModule } from 'primeng/blockui';


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json")
  }
@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponentComponent,
        SpinnerComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        CommonModule,
        BlockUIModule,
        TranslateModule.forRoot({
            loader: {
      
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient],
      
            }
          }),
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
        TranslateService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
