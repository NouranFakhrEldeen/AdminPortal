import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(public router: Router) {}
  @ViewChild("sidenav", { static: false }) sidenav: any;
  toggleSidenav() {
    this.sidenav.toggle();
    console.log(this.sidenav.toggle);
  }
  goToPages() {
    if (window.location.pathname === "/modifiers") {
      window.location.reload();
    } else this.router.navigate(["/modifiers"]);
  }
  ngOnInit() {}
}
