import { Inject, Injectable } from '@angular/core';
import * as branch from 'branch-sdk'
import { Journey_Template_Response_V1, PlanOfferResponse_V1 } from 'superfitjs';
import { SFPhotoFetcherService, ThumbnailSize } from './photo-fetcher.service';

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

@Injectable()
export class DeepLinkService {
  constructor(
    private photoFetcher: SFPhotoFetcherService,
    @Inject('branch_key') private branch_key: string
  ) {

    var options = { no_journeys: true };
    branch.init(branch_key, options, function (err, data) {
      //
    });
  }

  public createPlanWithOfferPublicLink(plan: Journey_Template_Response_V1, offer: PlanOfferResponse_V1, completion: ((link: string) => void), error?: ((err: any) => void)) {
    this.createJourneyTemplateLink(plan, offer, plan.title, Location.journeyTemplateDetailPreview, completion)
  }

  public createTrainingPlanTestLink(journeyTemplate: Journey_Template_Response_V1, completion: ((link: string) => void), error?: ((err: any) => void)) {
    this.createJourneyTemplateLink(journeyTemplate, null, `[Test] - ${journeyTemplate.title}`, Location.journeyTemplateDetailPreview, completion)
  }

  public createTrainingPlanPublicLink(journeyTemplate: Journey_Template_Response_V1, completion: ((link: string) => void), error?: ((err: any) => void)) {
    this.createJourneyTemplateLink(journeyTemplate, null, journeyTemplate.title, Location.journeyTemplateDetail, completion)
  }

  private createJourneyTemplateLink(
    plan: Journey_Template_Response_V1,
    planOffer: PlanOfferResponse_V1 = null,
    title: string,
    location: Location,
    completion: ((link: string) => void),
    error?: ((err: any) => void)
  ) {

    var linkData = {
      channel: 'SuperFit Web App',
      data: {
        '$og_title': title,
        '$og_description': plan.shortDescription,
        "$canonical_identifier": `${location}/${DeepLinkKey.PlanId}/${plan.id}`
      }
    };

    linkData.data[DeepLinkKey.PlanId] = plan.id
    linkData.data[DeepLinkKey.Location] = location

    if (planOffer) {
      linkData.data[DeepLinkKey.PlanOfferId] = planOffer.id
    }

    if (!plan.mainImagePhotoId) {
      branch.link(linkData, function (err, link) {
        if (err) {
          error(err)
          return
        }
        completion(link)
      });
    } else {
      this.photoFetcher
        .getPhoto(plan.mainImagePhotoId)
        .then(async photo => {

          if (photo.filePath) {
            let thumbnailUrl = await this.photoFetcher.fetchThumbnailPromise(ThumbnailSize.twoFiftySix, photo.filePath)

            if (thumbnailUrl) {
              linkData.data['$og_image_url'] = thumbnailUrl
              console.log(thumbnailUrl);

            } else {
              // default to master url
              linkData.data['$og_image_url'] = photo.masterUrl
            }

            branch.link(linkData, function (err, link) {
              if (err) {
                error(err)
                return
              }
              completion(link)
            });
          }
        })
        .catch(error => {
          // do not fail on error
          branch.link(linkData, function (err, link) {
            if (err) {
              error(err)
              return
            }
            completion(link)
          });
        })
    }
  }
}
