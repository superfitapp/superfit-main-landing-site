import { Component, OnInit } from '@angular/core';
import { UIStateService, NavigationType, NavigationTab } from '../../services/ui-state.service';
import { Observable, throwError } from 'rxjs';
import { IPlanProUsernamePublicInfo, PlanOfferResponse_V1, IPlanPublicInfo } from 'superfitjs';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import TemplateUtils from '../template-utils'
import { SEOService } from '../../services/seo.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { SFPhotoFetcherService } from 'src/app/services/photo-fetcher.service';
import { DeepLinkService } from '../../services/deep-link.service';

interface PlanOfferViewModel {
  planOnlyPrice: string
  planCoachingPrice?: string
  planOnlyLink?: string
  planCoachingLink?: string
}

@Component({
  selector: 'app-training-plan-template',
  templateUrl: './training-plan-template.component.html',
  styleUrls: ['./training-plan-template.component.css'],
  providers: [
    { provide: "storage", useValue: AngularFireStorage },
    { provide: "branch_key", useValue: environment.branch_key }
  ]
})
export class TrainingPlanTemplateComponent implements OnInit {

  planProInfo$: Observable<IPlanProUsernamePublicInfo>
  numberOfWeeks?: number
  experienceLevel?: string
  planOfferViewModel?: PlanOfferViewModel
  defaultPlanLink?: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private uiState: UIStateService,
    private apiService: ApiService,
    private seoService: SEOService,
    private photoFetcher: SFPhotoFetcherService,
    private deepLinkService: DeepLinkService
  ) {

    let templateId = this.route.snapshot.paramMap.get("templateId");
    let planOfferId = this.route.snapshot.paramMap.get("planOfferId");

    if (!templateId) {
      this.router.navigate(["/404"]);
      return
    }

    this.uiState.showNavigation = true
    this.uiState.navConfig = {
      navType: NavigationType.TemplateDetail,
      ctaText: "Start Plan",
      ctaUrl: "https://itunes.apple.com/us/app/superfit-sports-workouts/id1225772126",
      activeTab: NavigationTab.Remote
    }

    this.planProInfo$ = this.apiService
      .fetchPlanAndOwnerInfo(templateId, planOfferId)
      .pipe(
        tap(async info => {

          if (!info.planInfo) {
            this.router.navigate(["/404"]);
          }

          this.numberOfWeeks = TemplateUtils.trainingPlanTemplateTotalWeeks(info.planInfo)
          this.experienceLevel = TemplateUtils.experienceLevelText(info.planInfo)

          this.seoService.updateTitle(info.planInfo.title);
          this.seoService.updateDescription(info.planInfo.shortDescription)
          this.seoService.updateOgUrl()

          if (info.planInfo.mainImagePhotoId) {
            let photo = await this.photoFetcher.getPhoto(info.planInfo.mainImagePhotoId)
            if (photo) {
              this.seoService.updateImage(photo.masterUrl)
            }
          }

          const planOffer = info.planInfo.planOffer

          if (!planOffer) {
            this.planOfferViewModel = null
            this.deepLinkService.createTrainingPlanPublicLink(info.planInfo, defaultLink => {
              this.defaultPlanLink = defaultLink
            })
            return
          }

          var planOnlyPrice = null
          var planCoachingPrice = null

          if (planOffer.trainingPlanPrice !== null) {
            planOnlyPrice = planOffer.trainingPlanPrice > 0 ? `${planOffer.trainingPlanPrice / 100}` : "Free"
          }

          if (planOffer.remoteCoachingPrice !== null) {
            planCoachingPrice = planOffer.remoteCoachingPrice > 0 ? `${planOffer.remoteCoachingPrice / 100}` : "Free"
          }

          this.planOfferViewModel = {
            planOnlyPrice: planOnlyPrice,
            planCoachingPrice: planCoachingPrice,
          }


          this.deepLinkService.createPlanWithOfferPublicLink(info.planInfo, planOffer, link => {


            // Check if Plan Only costs money
            // Else, use same branch link and Plan + Coaching

            let planOnlyLink: string

            if (planOffer.trainingPlanPrice !== null && planOffer.trainingPlanPrice > 0) {
              planOnlyLink = `${environment.app_base_uri}/`
            }


            if (link) {
              this.planOfferViewModel = {
                ...this.planOfferViewModel,
                planOnlyLink: planOnlyLink,
                planCoachingLink: link
              }
            }
          })
        }),
        catchError(error => {
          this.router.navigate(["/404"]);
          return throwError(error)
        }))
  }

  async ngOnInit() {
  }


}
