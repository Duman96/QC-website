import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: '', component: NewsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
