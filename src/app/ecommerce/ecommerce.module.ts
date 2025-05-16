import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop/shop.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ChipModule } from 'primeng/chip';


@NgModule({
  declarations: [
    ShopComponent
  ],
  imports: [
      CommonModule,
      EcommerceRoutingModule,
      CardModule,
      DialogModule,
      ButtonModule,
      InputTextModule,
      InputTextareaModule,
      FileUploadModule,
      FormsModule,
      ReactiveFormsModule,
      ToastModule,
      ToolbarModule,
      TranslateModule,
      ConfirmDialogModule,
      CarouselModule,
      TagModule,
      RatingModule,
      ChipModule,
      
      
    ],
    providers: [MessageService,TranslatePipe,ConfirmationService],
})
export class EcommerceModule { }
