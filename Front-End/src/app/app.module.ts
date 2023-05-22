import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UpfileComponent } from './components/upfile/upfile.component';
import { TableCSVComponent } from './components/table-csv/table-csv.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from  '@angular/material/paginator';
import { LoginComponent } from './components/loggin/login/login.component';
import { ConLoginComponent } from './components/con-login/con-login/con-login.component';
import { RegisterComponent } from './components/register/register/register.component';
import { CargaComponent } from './components/carga/carga/carga.component';
import { FormsModule } from '@angular/forms';
import { SliderComponent } from './components/slider/slider/slider.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UpfileComponent,
    TableCSVComponent,
    LoginComponent,
    ConLoginComponent,
    RegisterComponent,
    CargaComponent,
    SliderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxDropzoneModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
