import { Component, ElementRef, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private elementRef: ElementRef,
        private primengConfig: PrimeNGConfig,
        private translate: TranslateService) {

        translate.addLangs(['en', 'fr']);
        translate.setDefaultLang('fr');

        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'fr');
    }

    ngOnInit() {
        this.primengConfig.ripple = true;

        var s = document.createElement("script");
        s.type = "text/javascript";
        this.elementRef.nativeElement.appendChild(s);
    }
}
