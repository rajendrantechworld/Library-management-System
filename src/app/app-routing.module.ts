import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
    },
    {
      path:'login',
      component:LoginComponent
    },
    {
      path:'admin',
      loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
    },
    {
      path:'User',
      loadChildren:()=>import('./user/user.module').then(m=>m.UserModule)
    }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
