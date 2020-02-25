import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { CategoryModel } from "../models/category.model";
import { CategoryDialogComponent } from "./category-dialog/category-dialog.component";
import { CategoryService } from "../services/category.service";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"]
})
export class CategoriesComponent implements OnInit {
  public Category: CategoryModel;
  public allCategories: CategoryModel[];
  dataSource = [
    {
      Beverages: "product2",

      food: [
        { Appetizers: [{ product1: "product1" }, { product2: "product1" }] },
        { Burgers: [{ 0: "product3", 1: "product3" }] }
      ]
    }
  ];

  public displayedColumns = ["Beverages", "food"];
  public displayedColumns2 = ["id", "Products Name"];
  constructor(
    public dialog: MatDialog,
    private service: CategoryService,
    private firestore: AngularFirestore
  ) {
    this.Category = new CategoryModel();
  }

  ngOnInit() {
    this.getAllData();
  }

  getAllData() {
    this.service.getCategories().subscribe(actionArray => {
      this.allCategories = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as CategoryModel;
      });
    });
  }

  // // Crud operartions
  // deleteData(itemToDelete: any) {
  //   this.openDialog(itemToDelete, "Delete Category", "Delete");
  // }
  // editData(itemToEdit: any) {
  //   this.openDialog(itemToEdit, "Edit Category", "Edit");
  // }
  onEdit(Category: CategoryModel) {
    this.service.formData = Object.assign({}, Category);
  }
  onDelete(id: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.firestore.doc("Categories/" + id).delete();
      // this.toastr.warning("Deleted successfully", "EMP. Register");
    }
  }
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
