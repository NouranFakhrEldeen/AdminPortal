import { Component, OnInit, Inject } from "@angular/core";
import { FormControl, Validators, FormGroup, NgForm } from "@angular/forms";
import {
  MatSnackBar,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatChipInputEvent
} from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { AngularFirestore } from "@angular/fire/firestore";

import { ModifierModel } from "../../models/modifier.model";
import { ModifierService } from "../../services/modifier.service";
import { from } from "rxjs";
@Component({
  selector: "app-modifier-dialog",
  templateUrl: "./modifier-dialog.component.html",
  styleUrls: ["./modifier-dialog.component.css"]
})
export class ModifierDialogComponent {
  // dataItem: ModifierService;
  modifierForm: FormGroup;
  public allModifier: ModifierModel[];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    private activeAouter: ActivatedRoute,
    private router: Router,
    private dataItem: ModifierService,
    private _messagePopup: MatSnackBar,
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<ModifierDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modifierForm = new FormGroup({
      id: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      price: new FormControl("", Validators.required),
      maxpicks: new FormControl("", Validators.required),
      multiselect: new FormControl("", Validators.required)
    });

    if (this.data.operationType === "Add") {
      this.dataItem.formData = new ModifierModel();
    } else {
      this.dataItem.formData = this.data.dialogData;
      this.dataItem.formData.id = this.data.dialogData.Id;
      this.dataItem.formData.name = this.data.dialogData.name;
      // this.dataItem.formData.multiselect = true;
    }
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.modifierForm.controls[controlName].hasError(errorName);
  };

  onSave() {
    if (this.data.operationType === "Add") {
      this.addData(this.modifierForm);
    }
    if (this.data.operationType === "Edit") {
      this.onEdit(this.dataItem.formData);

      this.editData(this.modifierForm);
    }

    // if (this.data.operationType === "Delete") {
    //   this.deleteData(this.modifierForm);
    // }
  }
  onEdit(modifier: ModifierModel) {
    this.dataItem.formData = Object.assign({}, modifier);
  }

  addData(objToAdd: FormGroup) {
    let data = Object.assign({}, objToAdd.value);
    delete data.id;
    if (objToAdd.value.id == null)
      this.firestore.collection("Modifiers").add(data);
    this.dialogRef.close();
  }

  editData(modifier) {
    let data = Object.assign({}, modifier.value);
    // delete data.id;
    console.log(data.id);
    console.log(modifier.value);
    this.firestore.doc("Modifiers/" + modifier.value.id).update(data);
    console.log(modifier.value.id);
    this.dialogRef.close();
  }
  // deleteData(objToDelete: any) {}

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
