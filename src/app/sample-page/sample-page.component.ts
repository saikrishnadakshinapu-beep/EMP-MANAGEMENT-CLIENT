import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sample-page',
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.css']
})
export class SamplePageComponent {
  title = '';

  constructor(private readonly route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      this.title = data['title'] as string;
    });
  }
}
