import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from '../services/api.service';
import { Phase_Response_V1, Journey_Template_Response_V1, Level, IAthletePublicInfo, IProPublicInfo, IPlanPublicInfo } from 'superfitjs';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { UIStateService } from '../services/ui-state.service';
import { SFPhotoFetcherService } from '../services/photo-fetcher.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  private username?: string
  private userPublicProfile$: Observable<IAthletePublicInfo>
  professionalProfile$: Observable<IProPublicInfo>
  plans: IPlanPublicInfo[] = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly apiService: ApiService,
    private readonly uiState: UIStateService
  ) {

    this.uiState.navConfig = null

    this.username = this.route.snapshot.paramMap.get("username");

    if (!this.username) {
      this.router.navigate(["/404"]);
      return
    }

    this.userPublicProfile$ = this.apiService
      .fetchUserPublicInfo(this.username)
      .pipe(
        tap(profile => {
          if (profile.proProfile) {
            this.fetchPlans()
          }
        }),
        catchError(error => {
          this.router.navigate(["/404"]);
          return throwError(error)
        }))

    this.professionalProfile$ = this.userPublicProfile$.pipe(map(athleteProfile => athleteProfile.proProfile))
  }

  ngOnInit() {

  }

  sortedPhasesByOrder(phases: Phase_Response_V1[]): Phase_Response_V1[] {
    return phases.sort((a, b) => a.order - b.order);
  }

  phaseTitle(phase: Phase_Response_V1): string {
    if (phase.title) {
      return phase.title
    }
    return `Phase ${phase.order + 1}`
  }

  fetchPlans() {
    this.apiService.fetchPublicPlansInfo(this.username, this.plans.length, 5)
      .subscribe(plans => {
        this.plans = this.plans.concat(plans)
      }, error => {
        throw error
      })
  }

  // first sentence
  phaseShortDescription(phase: Phase_Response_V1): string {
    let firstSentence = phase.fullDescription.split(".")[0]

    if (firstSentence) {
      return `${firstSentence}.`
    }

    return ""
  }

  experienceLevelText(journey: Journey_Template_Response_V1): string {
    switch (journey.level.toLowerCase()) {
      case Level.Beginner:
        return "Perfect for all fitness levels"
      case Level.Intermediate:
        return "Some training experience preferred"
      case Level.Advanced:
        return "Advanced fitness experience preferred"
      case Level.Pro:
        return "Advanced movement and strength experience required"
      default:
        return "Some training experience preferred"
    }
  }

  mainImageForPlan(plan: Journey_Template_Response_V1): string {
    const defaultUrl = "/assets/img/placeholder.png"
    return defaultUrl
  }
}
