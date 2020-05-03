import { Component } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SuperFit';
  constructor(
    private angulartics2: Angulartics2,
    private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics
  ) {
    this.angulartics2.settings.developerMode = !environment.production
    this.angulartics2GoogleAnalytics.startTracking()

    var options = { no_journeys: false };
    // branch.init(environment.branch_key, options, function (err, data) {
    // });
  }
}
