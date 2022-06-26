import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { ShowProductComponent } from './admin/show-product/show-product.component';
import { ModelProductsComponent } from './products/model-products/model-products.component';
import { LoginComponentsComponent } from './login-components/login-components.component';
import { SingupComponent } from './singup/singup.component';
import { SideNavadminComponent } from './side-navadmin/side-navadmin.component';
import { UserNavbarComponent} from './navBavcomponents/user-navbar/user-navbar.component';
import { PublicNavbarComponent } from './navBavcomponents/public-navbar/public-navbar.component';
import { AddSpecComponent } from './admin/add-spec/add-spec.component';
import { StockComponent } from './admin/stock/stock.component';
import { TabProductComponent } from './admin/tab-product/tab-product.component';
import { OrderComponent } from './admin/order/order.component';
import { HomeComponent } from './customer/home/home.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './customer/profile/profile.component';
import { EditContentComponent } from './admin/edit-content/edit-content.component';
import { CartComponent } from './customer/cart/cart.component';
import { OrdercustomerComponent } from './customer/ordercustomer/ordercustomer.component';

const routes: Routes = [
  // {path: 'admin/addProduct', component: AddProductComponent,canActivate: [AuthGuard],
  // data: {
  //   role: 'admin'
  // }},
  {path: 'home', component: PublicNavbarComponent},
  
  {path: 'login', component: LoginComponentsComponent},
  {path: 'singup', component: SingupComponent},
  {path: 'admin', component: SideNavadminComponent, canActivate: [AuthGuard],
  data: {
    role: 'admin' 
  }
  , children: [
    { path: 'addProduct', component: AddProductComponent},
    { path: 'addSpec', component: AddSpecComponent},
    { path: 'stock', component: StockComponent},
    { path: 'tabProduct', component: TabProductComponent},
    { path: 'order', component: OrderComponent},
    { path: 'editContent', component: EditContentComponent},
    {path: 'profile', component: ProfileComponent},
  ] 
  },
  {path: 'user', component: UserNavbarComponent, canActivate: [AuthGuard],
  data: {
    role: 'customer'
  }, children: [
    {path: 'home', component: HomeComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'cart', component: CartComponent},
    {path: 'order', component: OrdercustomerComponent},
  ]},
  {path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
