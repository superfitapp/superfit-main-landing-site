import { NgModule } from '@angular/core';
import { RootLayoutComponent } from './root-layout/root-layout.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UGCTermsComponent } from './ugcterms/ugcterms.component';
import { RemotelyComponent } from './remote/remotely.component'
import { RootLandingComponent } from './root-landing/root-landing.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { OurStoryComponent } from './our-story/our-story.component';
import { UserProfileComponent } from './user-profile/user-profile.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { TrainingPlanTemplateComponent } from './remote/training-plan-template/training-plan-template.component';
import { RouterModule, PreloadAllModules } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: "sign-in",
        component: SignInComponent
      },
      {
        path: "",
        component: RootLayoutComponent,
        children: [
          {
            path: "",
            component: RootLandingComponent,
            data: {
              title: 'SuperFit - Workout Mobile App',
              description: 'Curated Workout Plans for common fitness goals.',
              ogUrl: 'https://www.superfitapp.com'
            }
          },
          {
            path: "privacy-policy",
            component: PrivacyPolicyComponent
          },
          {
            path: "terms",
            component: TermsOfServiceComponent
          },
          {
            path: "ugc-terms",
            component: UGCTermsComponent
          },
          {
            path: "workout-spreadsheet",
            component: RemotelyComponent,
            data: {
              title: 'Workout Spreadsheet',
              description: 'Remote coaching tool for fitness professionals and personal trainers.',
              ogUrl: 'https://www.superfitapp.com/workout-spreadsheet'
            }
          },
          {
            path: "online-coaching",
            component: RemotelyComponent,
            data: {
              title: 'SuperFit Remote',
              description: 'Remote Coaching Software for personal trainers and fitness professionals.',
              ogUrl: 'https://www.superfitapp.com/online-coaching'
            }
          },
          {
            path: "remote",
            component: RemotelyComponent,
            data: {
              title: 'SuperFit Remote',
              description: 'Remote Coaching Software for personal trainers and fitness professionals.',
              ogUrl: 'https://www.superfitapp.com/online-coaching'
            }
          },
          {
            path: "our-story",
            component: OurStoryComponent
          },
          {
            path: "404",
            component: NotFoundComponent
          },
          {
            path: ":username",
            component: UserProfileComponent,
            children: [

            ]
          },
          {
            path: "plans/:templateId",
            component: TrainingPlanTemplateComponent,
          },
          {
            path: '**', redirectTo: '/404'
          }
        ]
      }
    ], {
      preloadingStrategy: PreloadAllModules
    })
  ]
  ,
  exports: [RouterModule],
  declarations: [
  ]
})
export class AppRoutingModule { }
