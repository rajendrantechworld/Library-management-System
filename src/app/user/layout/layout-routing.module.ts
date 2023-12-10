import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserbooklistComponent } from '../userbooklist/userbooklist.component';
import { UserdashboardComponent } from '../userdashboard/userdashboard.component';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,
    
    children: [
      {
        path:'',
        redirectTo:'Userdashboard',
        pathMatch:'full'
      },
      {
        path:'Userdashboard',
        component:UserdashboardComponent
      },
      {
        path:'Userbooklist',
        component:UserbooklistComponent
      }
    ]

}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
