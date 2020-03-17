import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../environments/environment';
import { UIStateService, NavigationType, NavigationTab } from '../services/ui-state.service';
declare var Beacon: any;


@Component({
  selector: 'app-remotely',
  templateUrl: './remotely.component.html',
  styleUrls: ['./remotely.component.css']
})
export class RemotelyComponent implements OnInit {
  @Input() webAppLink: string
  constructor(private uiState: UIStateService) {
    this.webAppLink = `${environment.base_uri}`
    this.uiState.navConfig = {
      navType: NavigationType.HomePage,
      ctaText: "Learn More",
      ctaUrl: environment.app_base_uri,
      activeTab: NavigationTab.Remote
    }
  }

  ngOnInit() {
  }

  openLiveChat() {
    Beacon("open");
    Beacon("navigate", "/ask/chat/")
  }
}
