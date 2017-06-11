import { NcDetailComponent } from './nc-detail/nc-detail.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { Router, RouterModule } from '@angular/router';
import { BusyModule } from 'angular2-busy';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { UsersNcsComponent } from './users-ncs/users-ncs.component';
import { AuthGuard } from 'app/security/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppHeaderComponent,
    UsersNcsComponent,
    NcDetailComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    BusyModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'Login', pathMatch: 'full' },
      { path: 'Login', component: LoginComponent },
      { path: 'UserNcs', component: UsersNcsComponent, canActivate: [AuthGuard] },
      { path: 'NcDetail/:ncId', component: NcDetailComponent , canActivate: [AuthGuard]}
    ])
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
