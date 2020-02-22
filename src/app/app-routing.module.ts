import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { EmployeesComponent } from "./employees/employees.component";
import { HomeComponent } from "./home/home.component";
import { CategoriesComponent } from "./categories/categories.component";
import { ModifiersComponent } from "./modifiers/modifiers.component";
import { from } from "rxjs";

const routes: Routes = [
  // { path: "login", component: LoginComponent },
  // { path: "", component: EmployeesComponent },
  // { path: "category", component: CategoriesComponent },
  // { path: "modifiers", component: ModifiersComponent }
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: "category", component: CategoriesComponent },
      { path: "modifiers", component: ModifiersComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
