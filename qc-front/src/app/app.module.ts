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



const routes: Routes = [
  { path: '', component: NewsComponent },
  { path: 'header', component: HeaderComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewsComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
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
