import { Component, OnInit } from '@angular/core';
import { UIStateService, NavigationType } from '../../services/ui-state.service';
import { Observable, throwError } from 'rxjs';
import { IPlanAndUsernameInfo } from 'superfitjs';
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

  planProInfo: Observable<IPlanAndUsernameInfo>
  numberOfWeeks?: number
  experienceLevel?: string
  planOfferViewModel?: PlanOfferViewModel
  defaultPlanLink?: string
  planOnlyCta = "Start Plan Now"

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

    this.planProInfo = this.apiService
      .fetchPlanInfo(templateId, planOfferId)
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

              this.uiState.navConfig = {
                ctaText: "Start Free Plan",
                ctaUrl: defaultLink,
                navType: NavigationType.TemplateDetail
              }
            })

            this.planOnlyCta = this.uiState.navConfig.ctaText
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

          this.deepLinkService.createPlanWithOfferPublicLink(info.planInfo, planOffer, appLink => {

            // Check if Plan Only costs money
            // Else, use same branch link and Plan + Coaching

            let planOnlyLink: string

            // Plan only costs money
            if (planOffer.trainingPlanPrice !== null && planOffer.trainingPlanPrice > 0) {
              planOnlyLink = `${environment.app_base_uri}/checkout/purchase-plan/${info.planInfo.id}/${planOffer.id}`
              this.uiState.navConfig = {
                ctaText: "Purchase Plan",
                ctaUrl: planOnlyLink,
                navType: NavigationType.TemplateDetail
              }
            } else {
              planOnlyLink = appLink
              this.defaultPlanLink = appLink
              this.uiState.navConfig = {
                ctaText: "Start Free Plan",
                ctaUrl: appLink,
                navType: NavigationType.TemplateDetail
              }
            }

            this.planOnlyCta = this.uiState.navConfig.ctaText

            this.planOfferViewModel = {
              planOnlyPrice: planOnlyPrice,
              planCoachingPrice: planCoachingPrice,
              planOnlyLink: planOnlyLink,
              planCoachingLink: appLink
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
