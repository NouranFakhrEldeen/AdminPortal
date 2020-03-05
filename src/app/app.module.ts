import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSliderModule } from "@angular/material/slider";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from "../environments/environment";
import { LoginComponent } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { EmployeesComponent } from "./employees/employees.component";
import { EmployeeComponent } from "./employees/employee/employee.component";
import { EmployeeListComponent } from "./employees/employee-list/employee-list.component";
import { EmployeeService } from "./shared/employee.service";
import { AuthService } from "./core/auth.service";

import { AngularMaterialModule } from "./shared/material.module";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HomeComponent } from "./home/home.component";
import { ProductComponent } from "./product/product.component";
import { CategoriesComponent } from "./categories/categories.component";
import { ModifiersComponent } from "./modifiers/modifiers.component";
import { CategoryDialogComponent } from "./categories/category-dialog/category-dialog.component";
import { ModifierDialogComponent } from "./modifiers/modifier-dialog/modifier-dialog.component";

import { ProductDialogComponent } from "./product/product-dialog/product-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    SidebarComponent,
    HomeComponent,
    ProductComponent,
    CategoriesComponent,
    ModifiersComponent,
    CategoryDialogComponent,
    ModifierDialogComponent,

    ProductDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  entryComponents: [CategoryDialogComponent, ModifierDialogComponent],
  providers: [EmployeeService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
