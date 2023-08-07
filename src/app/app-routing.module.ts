import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'auth' },
  { path: 'auth', loadChildren: () => AuthModule },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
