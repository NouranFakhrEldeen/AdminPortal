import { Injectable } from "@angular/core";
import { CategoryModel } from "../models/category.model";
import { AngularFirestore } from "@angular/fire/firestore";
@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(private firestore: AngularFirestore) {}
  formData: CategoryModel;
  getEmployees() {
    return this.firestore.collection("Categories").snapshotChanges();
  }
}
