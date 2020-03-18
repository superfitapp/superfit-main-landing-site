import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIStateService, NavigationConfig } from '../services/ui-state.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-default-navigation',
  templateUrl: './default-navigation.component.html',
  styleUrls: ['./default-navigation.component.css']
})
export class DefaultNavigationComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public uiState: UIStateService
  ) {
  }

  ngOnInit() {

  }
}
