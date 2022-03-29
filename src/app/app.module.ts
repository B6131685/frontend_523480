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
    SingupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
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
