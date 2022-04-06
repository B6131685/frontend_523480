import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PublicNavbarComponent } from './navBavcomponents/public-navbar/public-navbar.component';
import { AdminNavbarComponent } from './navBavcomponents/admin-navbar/admin-navbar.component';
import { UserNavbarComponent } from './navBavcomponents/user-navbar/user-navbar.component';
import { LoginComponentsComponent } from './login-components/login-components.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { ShowProductComponent } from './admin/show-product/show-product.component';
import { ModelProductsComponent } from './products/model-products/model-products.component';
import { SingupComponent } from './singup/singup.component';
import { AngularWebStorageModule } from 'angular-web-storage';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { SideNavadminComponent } from './side-navadmin/side-navadmin.component';
import { NgRouterOutletCommDirective } from 'ng-router-outlet-comm/lib/ng-router-outlet-comm.directive';
import { AddSpecComponent } from './admin/add-spec/add-spec.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//mat
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    PublicNavbarComponent,
    AdminNavbarComponent,
    UserNavbarComponent,
    LoginComponentsComponent,
    AddProductComponent,
    ShowProductComponent,
    ModelProductsComponent,
    SingupComponent,
    SideNavadminComponent,
    AddSpecComponent,
    
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
