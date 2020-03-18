import { Component, OnInit, Input } from '@angular/core';
import { UIStateService } from '../services/ui-state.service';

@Component({
  selector: 'app-root-layout',
  templateUrl: './root-layout.component.html',
  styleUrls: ['./root-layout.component.css']
})
export class RootLayoutComponent implements OnInit {

  constructor(
    public readonly uiState: UIStateService
  ) { }

  ngOnInit() {

  }

}
