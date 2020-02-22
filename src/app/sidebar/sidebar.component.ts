import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  constructor(public router: Router) {}
  showFiller = true;
  panelOpenState = false;
  // goToPages() {
  //   if (window.location.pathname === "/modifiers") {
  //     window.location.reload();
  //   } else this.router.navigate(["/category"]);
  // }
  ngOnInit() {}
}
