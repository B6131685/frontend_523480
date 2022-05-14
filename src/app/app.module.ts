import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PublicNavbarComponent } from './navBavcomponents/public-navbar/public-navbar.component';
import { UserNavbarComponent } from './navBavcomponents/user-navbar/user-navbar.component';
import { LoginComponentsComponent } from './login-components/login-components.component';
import { AddProductComponent,DialogEditSpecAtProductComponent } from './admin/add-product/add-product.component';
import { ShowProductComponent } from './admin/show-product/show-product.component';
import { ModelProductsComponent } from './products/model-products/model-products.component';
import { SingupComponent } from './singup/singup.component';
import { AngularWebStorageModule } from 'angular-web-storage';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { SideNavadminComponent } from './side-navadmin/side-navadmin.component';
import { NgRouterOutletCommDirective } from 'ng-router-outlet-comm/lib/ng-router-outlet-comm.directive';
import { AddSpecComponent } from './admin/add-spec/add-spec.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import { StockComponent, DialogOverviewExampleDialog,DialogSettingProduct, DialogNewProduct } from './admin/stock/stock.component';

//mat
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCommonModule} from '@angular/material/core';
import {MatBadgeModule} from '@angular/material/badge';
import { StockButtonComponent } from './admin/stock-button/stock-button.component';
import { TabProductComponent } from './admin/tab-product/tab-product.component';
import {MatListModule} from '@angular/material/list';
import { UpdateProductComponent, DialogEditSpecAtUpdateProductComponent } from './admin/update-product/update-product.component';
import { OrderComponent } from './admin/order/order.component';
import { DialogShowProductComponent } from './customer/dialog-show-product/dialog-show-product.component';
import { HomeComponent,DialogHomeShowProduct } from './customer/home/home.component';
import { ProfileComponent, addresssDialog, EmailDialog, PasswordDialog } from './customer/profile/profile.component';
import { EditContentComponent } from './admin/edit-content/edit-content.component';
import { CartComponent } from './customer/cart/cart.component';
import { ChartCheckoutComponent } from './customer/chart-checkout/chart-checkout.component';
import { OrdercustomerComponent } from './customer/ordercustomer/ordercustomer.component';
import { SlipComponent } from './customer/slip/slip.component';
@NgModule({
  declarations: [
    AppComponent,
    PublicNavbarComponent,
    UserNavbarComponent,
    LoginComponentsComponent,
    AddProductComponent,DialogEditSpecAtProductComponent,
    ShowProductComponent,
    ModelProductsComponent,
    SingupComponent,
    SideNavadminComponent,
    AddSpecComponent,
    StockComponent,
    DialogOverviewExampleDialog,
    StockButtonComponent,
    TabProductComponent,
    DialogSettingProduct,
    DialogNewProduct,
    UpdateProductComponent,DialogEditSpecAtUpdateProductComponent, 
    OrderComponent, DialogShowProductComponent, 
    HomeComponent,DialogHomeShowProduct, 
    ProfileComponent,addresssDialog,EmailDialog, PasswordDialog,
    EditContentComponent,
    CartComponent,
    ChartCheckoutComponent,
    OrdercustomerComponent,
    SlipComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatSliderModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatExpansionModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatTabsModule,
    MatListModule,
    MatCommonModule,
    MatButtonToggleModule,
    MatBadgeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
