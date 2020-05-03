import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { SEOService } from '../services/seo.service';
import { UIStateService, NavigationType } from '../services/ui-state.service';

@Component({
  selector: 'app-root-landing',
  templateUrl: './root-landing.component.html',
  styleUrls: ['./root-landing.component.css']
})
export class RootLandingComponent implements OnInit {

  constructor(
    private uiState: UIStateService
  ) {
    this.uiState.navConfig = {
      navType: NavigationType.HomePage,
      ctaText: "Download iOS App",
      ctaUrl: "https://itunes.apple.com/us/app/superfit-sports-workouts/id1225772126",
    }
  }

  ngOnInit() {

  }
}
