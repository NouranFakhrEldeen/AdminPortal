import { Injectable } from "@angular/core";
import { ModifierModel } from "../models/modifier.model";
import { AngularFirestore } from "@angular/fire/firestore";
@Injectable({
  providedIn: "root"
})
export class ModifierService {
  constructor(private firestore: AngularFirestore) {}
  formData: ModifierModel;
  getModifier() {
    return this.firestore.collection("Modifiers").snapshotChanges();
  }
}
