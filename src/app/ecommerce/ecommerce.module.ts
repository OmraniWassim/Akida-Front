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
import { MegaMenuModule } from 'primeng/megamenu';
import { DataViewModule } from 'primeng/dataview';
import { ProductsListComponent } from './products-list/products-list.component';
import { DropdownModule } from 'primeng/dropdown';
import { PreviewProductComponent } from './preview-product/preview-product.component';
import { GalleriaModule } from 'primeng/galleria';
import { InputNumberModule } from 'primeng/inputnumber';


@NgModule({
  declarations: [
    ShopComponent,
    ProductsListComponent,
    PreviewProductComponent
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
      MegaMenuModule,
      DataViewModule,
      DropdownModule,
      GalleriaModule,
      InputNumberModule,
      
      
      
    ],
    providers: [MessageService,TranslatePipe,ConfirmationService],
})
export class EcommerceModule { }
