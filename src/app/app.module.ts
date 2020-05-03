import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { Angulartics2Module } from 'angulartics2';
import { ApiService } from './services/api.service';
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
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

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
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    Angulartics2Module.forRoot()
  ],
  providers: [
    AngularFireStorage,
    ApiService,
    SEOService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

