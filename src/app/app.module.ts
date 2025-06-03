import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';

// PrimeNG imports
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { GalleriaModule } from 'primeng/galleria';
import { RippleModule } from 'primeng/ripple';

// Components
import { HeaderComponent } from './components/header/header.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { FeaturedImagesComponent } from './components/featured-images/featured-images.component';
import { ShopSectionComponent } from './components/shop-section/shop-section.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json")
}

@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponentComponent,
        SpinnerComponent,
        HeaderComponent,
        HeroSectionComponent,
        FeaturedImagesComponent,
        ShopSectionComponent,
        AboutUsComponent,
        ContactUsComponent,
        FooterComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
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
        ReactiveFormsModule,
        MenubarModule,
        ButtonModule,
        CardModule,
        CarouselModule,
        InputTextModule,
        InputTextareaModule,
        PanelModule,
        ToolbarModule,
        GalleriaModule,
        RippleModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
        TranslateService,
        MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
