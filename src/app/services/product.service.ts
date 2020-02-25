import { Injectable } from "@angular/core";
import { ProductModel } from "../models/product.model";
import { AngularFirestore } from "@angular/fire/firestore";
@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private firestore: AngularFirestore) {}
  formData: ProductModel;
  getProducts() {
    return this.firestore.collection("Product").snapshotChanges();
  }
}
