import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { CategoryModel } from "../models/category.model";
import { CategoryDialogComponent } from "./category-dialog/category-dialog.component";
@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"]
})
export class CategoriesComponent implements OnInit {
  public Category: CategoryModel;
  public allCategories: CategoryModel[];
  public displayedColumns = ["CategoryName", "actions"];
  constructor(public dialog: MatDialog) {
    this.Category = new CategoryModel();
  }

  ngOnInit() {
    this.getAllData();
  }

  getAllData() {
    //   this._service.getAll("Categories").subscribe(data => {
    //     this.allCategories = data;
    //   });
  }

  // // Crud operartions
  // deleteData(itemToDelete: any) {
  //   this.openDialog(itemToDelete, "Delete Category", "Delete");
  // }
  // editData(itemToEdit: any) {
  //   this.openDialog(itemToEdit, "Edit Category", "Edit");
  // }
  addData() {
    this.openDialog(null, "Add New Category", "Add");
  }

  openDialog(obj: any, DialogHeader: string, DialogType: string): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: "600px",
      data: {
        dialogData: obj,
        dialogHeader: DialogHeader,
        operationType: DialogType
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.getAllData();
      }
    });
  }
}
