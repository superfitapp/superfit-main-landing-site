import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UIStateService {
  showNavigation: boolean = true
  constructor() { }
}