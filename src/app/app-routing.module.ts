import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { ShowProductComponent } from './admin/show-product/show-product.component';
import { ModelProductsComponent } from './products/model-products/model-products.component';
import { LoginComponentsComponent } from './login-components/login-components.component';
import { SingupComponent } from './singup/singup.component';
import { SideNavadminComponent } from './side-navadmin/side-navadmin.component';
import { UserNavbarComponent} from './navBavcomponents/user-navbar/user-navbar.component';
import { AdminNavbarComponent } from './navBavcomponents/admin-navbar/admin-navbar.component';
import { PublicNavbarComponent } from './navBavcomponents/public-navbar/public-navbar.component';
import { AddSpecComponent } from './admin/add-spec/add-spec.component';


import { AuthGuard } from './auth.guard';

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
    { path: 'addSpec', component: AddSpecComponent}
  ] 
  },
  {path: 'user', component: UserNavbarComponent, canActivate: [AuthGuard],
  data: {
    role: 'customer'
  }},
  {path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
