import { Component, OnInit } from '@angular/core';
import { UIStateService, NavigationType, NavigationTab } from '../../services/ui-state.service';
import { Observable, throwError } from 'rxjs';
import { Journey_Template_Response_V1 } from 'superfitjs';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import TemplateUtils from '../template-utils'
import { SEOService } from '../../services/seo.service';
import { PhotoService } from '../../services/photo.service';


@Component({
  selector: 'app-training-plan-template',
  templateUrl: './training-plan-template.component.html',
  styleUrls: ['./training-plan-template.component.css']
})
export class TrainingPlanTemplateComponent implements OnInit {

  trainingPlanTemplate$: Observable<Journey_Template_Response_V1>
  numberOfWeeks?: number
  experienceLevel?: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private uiState: UIStateService,
    private apiService: ApiService,
    private seoService: SEOService,
    private photoService: PhotoService

  ) {

    let templateId = this.route.snapshot.paramMap.get("templateId");

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

    this.trainingPlanTemplate$ = this.apiService
      .fetchTrainingPlanTemplate(templateId)
      .pipe(
        tap(async template => {
          this.numberOfWeeks = TemplateUtils.trainingPlanTemplateTotalWeeks(template)
          this.experienceLevel = TemplateUtils.experienceLevelText(template)

          this.seoService.updateTitle(template.title);
          this.seoService.updateOgUrl()

          if (template.mainImagePhotoId) {
            let photo = await this.photoService.getPhoto(template.mainImagePhotoId)
            if (photo) {
              this.seoService.updateImage(photo.masterUrl)
            }
          }
          //Updating Description tag dynamically with title
          this.seoService.updateDescription(template.shortDescription)
        }),
        catchError(error => {
          this.router.navigate(["/404"]);
          return throwError(error)
        }))
  }

  ngOnInit() {
  }
}
