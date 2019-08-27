import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ClassProvider } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { AuthInterceptor } from './AuthInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { IndexComponent } from './index/index.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NewspageComponent } from './newspage/newspage.component';


const routes: Routes = [
{ path: '', component: WelcomeComponent },
{ path: 'news', component: NewsComponent },
{ path: 'header', component: HeaderComponent, canActivate: [AuthGuard] },
{ path: 'profile', component: ProfileComponent},
{ path: 'news/:id', component: NewspageComponent },
{ path: 'index', component: IndexComponent },
{ path: 'login', component: LoginComponent},
{ path: 'navbar', component: NavbarComponent, canActivate: [AuthGuard] },
{ path: '**', redirectTo: '' }];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewsComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    IndexComponent,
    NavbarComponent,
    WelcomeComponent,
    NewspageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    Ng2ImgMaxModule
  ],
  providers: [
    UserService, 
    AuthGuard,
    <ClassProvider> {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
