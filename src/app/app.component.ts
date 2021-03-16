import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavItem } from './Layout/menu-list-item/nav-item';
import { NavService } from './Layout/menu-list-item/nav.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,AfterViewInit {
  navItems: NavItem[] = [];
  @ViewChild("appDrawer") appDrawer: ElementRef;
  /**
   *
   */
  constructor( private navService:NavService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
      this.matIconRegistry.addSvgIcon(
        "Project",
        this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/images/Project.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "Project_active",
        this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/images/Project_active.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "Data_enrich",
        this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/images/Data_enrich.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "Data_enrich_active",
        this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/images/Data_enrich_active.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "Performance",
        this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/images/Performance.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "Cataloge",
        this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/images/Cataloge.svg")
      );
      this.matIconRegistry.addSvgIcon(
        "Dashboard",
        this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/images/Dashboard.svg")
      );
    }
  
  ngOnInit(){
    this.navItems=[
      {
        route:'projects',
        iconName:'Project',
        isSvgIcon:true,
        displayName:"Projects"
      },
      {
        route:'de',
        iconName:'Data_enrich',
        isSvgIcon:true,
        displayName:"Data Enrich"
      },
      {
        route:'de1',
        iconName:'Dashboard',
        isSvgIcon:true,
        displayName:"Dashboard"
      },
      {
        route:'de2',
        iconName:'Performance',
        isSvgIcon:true,
        displayName:"Performance"
      },
      {
        route:'de3',
        iconName:'Cataloge',
        isSvgIcon:true,
        displayName:"Cataloge"
      }
    ];
  }
  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
}
