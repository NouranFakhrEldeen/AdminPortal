import { Component, OnInit, Inject } from "@angular/core";
import { FormControl, Validators, FormGroup, NgForm } from "@angular/forms";
import {
  MatSnackBar,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatChipInputEvent,
  MatCheckboxChange,
  MatCheckbox
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
  IsChecked = false;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    private activeAouter: ActivatedRoute,
    private router: Router,
    private service: ModifierService,
    private _messagePopup: MatSnackBar,
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<ModifierDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modifierForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      price: new FormControl("", Validators.required),
      maxpicks: new FormControl("", Validators.required),
      multiselect: new FormControl(true, Validators.required)
    });

    if (this.data.operationType === "Add") {
      this.service.formData = new ModifierModel();
    } else {
      this.service.formData = this.data.dialogData;
      // this.service.formData.id = this.data.dialogData.id;
      // this.service.formData.name = this.data.dialogData.name;
      // this.service.formData.multiselect = true;
    }
    this.resetForm();
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.modifierForm.controls[controlName].hasError(errorName);
  };

  onSave() {
    if (this.data.operationType === "Add") {
      this.addData(this.modifierForm);
    }
    if (this.data.operationType === "Edit") {
      debugger;
      // this.onEdit(this.service.formData);
      // this.service.formData = Object.assign({}, this.modifierForm.value);

      this.editData(this.service.formData);
    }

    // if (this.data.operationType === "Delete") {
    //   this.deleteData(this.modifierForm);
    // }
  }

  addData(objToAdd: FormGroup) {
    let data = Object.assign({}, objToAdd.value);
    delete data.id;
    if (objToAdd.value.id == null)
      this.firestore.collection("Modifiers").add(data);
    this.dialogRef.close();
    this.resetForm(this.modifierForm);
  }

  editData(test: any) {
    let data = Object.assign({}, test);
    debugger;
    this.firestore.doc("Modifiers/" + test.id).update(data);
    console.log(test.value.id);
    this.dialogRef.close();
  }

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

  resetForm(modifierForm?: FormGroup) {
    if (modifierForm != null) modifierForm.reset();
    this.service.formData = {
      id: null,
      name: "",
      description: "",
      price: "",
      maxpicks: "",
      multiselect: true
    };
  }
  OnChange($event) {
    console.log($event);
    // this.IsChecked = true;
  }
}
