import { Component, OnInit, Inject } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import {
  MatSnackBar,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatChipInputEvent
} from "@angular/material";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { CategoryModel } from "../../models/category.model";
@Component({
  selector: "app-category-dialog",
  templateUrl: "./category-dialog.component.html",
  styleUrls: ["./category-dialog.component.css"]
})
export class CategoryDialogComponent {
  dataItem: CategoryModel;
  categoryForm: FormGroup;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    private _messagePopup: MatSnackBar,
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.categoryForm = new FormGroup({
      categoryName: new FormControl("", Validators.required)
    });
    if (this.data.operationType === "Add") {
      this.dataItem = new CategoryModel();
    } else {
      this.dataItem = this.data.dialogData;
      this.dataItem.categoryId = this.data.dialogData.CategoryId;
      this.dataItem.categoryName = this.data.dialogData.CategoryName;
    }
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.categoryForm.controls[controlName].hasError(errorName);
  };
  onSave() {
    if (this.data.operationType === "Add") {
      this.addData(this.dataItem);
    }
    if (this.data.operationType === "Edit") {
      this.editData(this.dataItem);
    }

    if (this.data.operationType === "Delete") {
      this.deleteData(this.dataItem);
    }
  }

  addData(objToAdd: any) {}

  editData(objToEdit: any) {}
  deleteData(objToDelete: any) {}

  onCancelClick(event): void {
    event.preventDefault();
    this.dialogRef.close();
  }

  fireSnackBar(message: string, action, classType: string) {
    this._messagePopup.open(message, action, {
      duration: 3000,
      panelClass: [classType],
      horizontalPosition: "right"
    });
  }
}
