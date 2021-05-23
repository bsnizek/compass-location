import { Component, OnInit } from '@angular/core';
import { Motion } from '@capacitor/motion';
import {LocationAndOrientationService} from '../location-and-orientation.service';
import {OrientationService} from '../services/orientation.service';

@Component({
  selector: 'app-secondpage',
  templateUrl: './secondpage.page.html',
  styleUrls: ['./secondpage.page.scss'],
})
export class SecondpagePage implements OnInit {

  alpha = 0;

  constructor(
    public orientationService: OrientationService
  ) {
  }

  ngOnInit() {
    this.subscribeToDeviceOrientation().then(r => console.log('secondpage subsc: ', r));
  }

  private async subscribeToDeviceOrientation() {
    this.orientationService.subscribeOrientation();
    this.orientationService.getOrientation().subscribe(event => {
        console.log('getOrientation() SUBSCRIBED', event);
        this.alpha = event.alpha;
      }
    );
  }

}
