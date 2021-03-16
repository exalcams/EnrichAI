import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ProjectsComponent } from './Pages/projects/projects.component';
import { MatListModule } from "@angular/material/list";
import { MenuListItemComponent } from './Layout/menu-list-item/menu-list-item.component';
import {NavService} from './Layout/menu-list-item/nav.service';
import { MatIconModule } from "@angular/material/icon";
import { DeComponent } from './Pages/data-enrich/de.component';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from "@angular/common/http";
import {MatRippleModule} from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExcelService } from './Services/excel.service';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    MenuListItemComponent,
    DeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatRippleModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [NavService,ExcelService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
