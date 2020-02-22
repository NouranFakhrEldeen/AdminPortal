import { Component, OnInit, Inject } from "@angular/core";

import { ModifierModel } from "../models/modifier.model";
import { ModifierDialogComponent } from "./modifier-dialog/modifier-dialog.component";
import { MatDialog } from "@angular/material";
import { AngularFirestore } from "@angular/fire/firestore";
import { ModifierService } from "../services/modifier.service";
@Component({
  selector: "app-modifiers",
  templateUrl: "./modifiers.component.html",
  styleUrls: ["./modifiers.component.css"]
})
export class ModifiersComponent implements OnInit {
  public modifier: ModifierModel;
  public allModifier: ModifierModel[];
  public displayedColumns = [
    "name",
    "description",
    "price",
    "maxpicks",
    "multiselect",
    "actions"
  ];

  constructor(
    public dialog: MatDialog,
    private firestore: AngularFirestore,
    private service: ModifierService
  ) {
    this.modifier = new ModifierModel();
  }

  ngOnInit() {
    this.getAllData();
  }
  getAllData() {
    this.service.getModifier().subscribe(data => {
      this.allModifier = data.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as ModifierModel;
      });
      console.log(this.allModifier);
    });
  }

  // // Crud operartions
  // deleteData(itemToDelete: any) {
  //   this.openDialog(itemToDelete, "Delete Modifier", "Delete");
  // }
  deleteData(id: string) {
    console.log(id);
    if (confirm("Are you sure to delete this record?")) {
      this.firestore.doc("Modifiers/" + id).delete();
      // this.toastr.warning("Deleted successfully", "EMP. Register");
    }
  }
  editData(modifier: any) {
    this.openDialog(modifier, "Edit Modifier", "Edit");
  }
  addData() {
    this.openDialog(null, "Add New Modifier", "Add");
  }

  openDialog(obj: any, DialogHeader: string, DialogType: string): void {
    const dialogRef = this.dialog.open(ModifierDialogComponent, {
      width: "600px",
      data: {
        dialogData: obj,
        dialogHeader: DialogHeader,
        operationType: DialogType
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllData();
      }
    });
  }
}
