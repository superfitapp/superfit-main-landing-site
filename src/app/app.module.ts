import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { Angulartics2Module } from 'angulartics2';
import { ApiService } from './services/api.service';
import { CurrentUserService } from './services/current-user.service';
import { SEOService } from './services/seo.service';
import { RemotelyComponent } from './remote/remotely.component'
import { RootLandingComponent } from './root-landing/root-landing.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { OurStoryComponent } from './our-story/our-story.component';
import { UserProfileComponent } from './user-profile/user-profile.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { RootLayoutComponent } from './root-layout/root-layout.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UGCTermsComponent } from './ugcterms/ugcterms.component';
import { SharedModule } from './modules/shared/shared.module';
import { TrainingPlanTemplateComponent } from './remote/training-plan-template/training-plan-template.component';
import { LazyImageModule } from './modules/lazy-image/lazy-image.module';
import { PhotoLoaderModule } from './modules/photo-loader/photo-loader.module';

@NgModule({
  declarations: [
    AppComponent,
    RootLandingComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    OurStoryComponent,
    UserProfileComponent,
    UGCTermsComponent,
    NotFoundComponent,
    RemotelyComponent,
    RootLayoutComponent,
    SignInComponent,
    TrainingPlanTemplateComponent
  ],
  imports: [
    LazyImageModule,
    PhotoLoaderModule,
    BrowserModule,
    NoopAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    Angulartics2Module.forRoot()
  ],
  providers: [
    ApiService,
    CurrentUserService,
    SEOService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

