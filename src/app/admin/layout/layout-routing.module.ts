import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookslistComponent } from '../bookslist/bookslist.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProfileComponent } from '../profile/profile.component';
import { TransactionsComponent } from '../transactions/transactions.component';
import { UsersComponent } from '../users/users.component';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutComponent,

    children:[

      {
        path:'',
        redirectTo:'dashboard',
        pathMatch:'full'
      },

      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'bookslist',
        component:BookslistComponent
      },
      {
        path:'users',
        component:UsersComponent
      },

    {
      path:'transactions',
      component:TransactionsComponent
    }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
