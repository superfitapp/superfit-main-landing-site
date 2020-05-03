import { Injectable, Input } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UIStateService {
  navConfig?: NavigationConfig

  constructor() {
    this.navConfig = {
      navType: NavigationType.HomePage,
      ctaText: "Sign In",
      ctaUrl: environment.app_base_uri,
    }
  }
}

export interface NavigationConfig {
  navType: NavigationType
  ctaText?: string
  ctaUrl?: string
}

export const enum NavigationType {
  HomePage = "HomePage",
  TemplateDetail = "TemplateDetail"
}