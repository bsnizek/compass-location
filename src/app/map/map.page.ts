import { Component, OnInit } from '@angular/core';
import {LocationAndOrientationService} from '../location-and-orientation.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  constructor(
    private locationorientationservice: LocationAndOrientationService
  ) { }

  ngOnInit() {
    //   // 1. We subscribe to the both-are-available event of the service
    //   this.locationorientationservice.subscribeToBothGranted().then(() => {
    //     console.log('KAPOW');
    //     // #2 Initialize the map
    //   })
    // }
  }

}
