import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import * as branch from 'branch-sdk'
import { PlanOfferResponse_V1, IPlanPublicInfo } from "@superfitapp/superfitjs";
import { SFPhotoFetcherService, ThumbnailSize } from './photo-fetcher.service';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

const enum Location {
  learnTab = "learnTab",
  catalogTab = "catalogTab",
  dashboardTab = "dashboardTab",
  userSettings = "userSettings",
  journeyTemplateDetail = "journeyTemplateDetail",
  journeyTemplateDetailPreview = "journeyTemplateDetailPreview",
}

const enum DeepLinkKey {
  PlanOfferId = "planOfferId",
  Location = "location",
  PlanId = "planId"
}

@Injectable({ providedIn: 'root' })
export class DeepLinkService {
  constructor(
    private photoFetcher: SFPhotoFetcherService,
    @Inject(PLATFORM_ID) private platformId: Object,

  ) {

    var options = { no_journeys: true };

    if (isPlatformBrowser(this.platformId)) {
      // branch.init(environment.branch_key, options, function (err, data) {
      //   //
      // });
    }
  }



  // use any IPlanPublicInfo of journey template.

  public createPlanWithOfferPublicLink(plan: IPlanPublicInfo, offer: PlanOfferResponse_V1, completion: ((link: string) => void), error?: ((err: any) => void)) {
    this.createJourneyTemplateLink(plan, offer, plan.title, Location.journeyTemplateDetail, completion)
  }

  public createTrainingPlanTestLink(plan: IPlanPublicInfo, completion: ((link: string) => void), error?: ((err: any) => void)) {
    this.createJourneyTemplateLink(plan, null, `[Test] - ${plan.title}`, Location.journeyTemplateDetailPreview, completion)
  }

  public createTrainingPlanPublicLink(plan: IPlanPublicInfo, completion: ((link: string) => void), error?: ((err: any) => void)) {
    this.createJourneyTemplateLink(plan, null, plan.title, Location.journeyTemplateDetail, completion)
  }

  private createJourneyTemplateLink(
    plan: IPlanPublicInfo,
    planOffer: PlanOfferResponse_V1 = null,
    title: string,
    location: Location,
    completion: ((link: string) => void),
    error?: ((err: any) => void)
  ) {

    // var linkData = {
    //   channel: 'SuperFit Web App',
    //   data: {
    //     '$og_title': title,
    //     '$og_description': plan.shortDescription,
    //     "$canonical_identifier": `${location}/${DeepLinkKey.PlanId}/${plan.id}`
    //   }
    // };

    // linkData.data[DeepLinkKey.PlanId] = plan.id
    // linkData.data[DeepLinkKey.Location] = location

    // if (planOffer) {
    //   linkData.data[DeepLinkKey.PlanOfferId] = planOffer.id
    // }

    // if (!plan.mainImagePhotoId) {
    //   branch.link(linkData, function (err, link) {
    //     if (err) {
    //       error(err)
    //       return
    //     }
    //     completion(link)
    //   });
    // } else {
    //   this.photoFetcher
    //     .getPhoto(plan.mainImagePhotoId)
    //     .then(async photo => {

    //       if (photo.filePath) {
    //         let thumbnailUrl = await this.photoFetcher.fetchThumbnailPromise(ThumbnailSize.twoFiftySix, photo.filePath)

    //         if (thumbnailUrl) {
    //           linkData.data['$og_image_url'] = thumbnailUrl
    //         } else {
    //           // default to master url
    //           linkData.data['$og_image_url'] = photo.masterUrl
    //         }

    //         branch.link(linkData, function (err, link) {
    //           if (err) {
    //             error(err)
    //             return
    //           }
    //           completion(link)
    //         });
    //       }
    //     })
    //     .catch(error => {
    //       // do not fail on error
    //       branch.link(linkData, function (err, link) {
    //         if (err) {
    //           error(err)
    //           return
    //         }
    //         completion(link)
    //       });
    //     })
    // }
  }
}
