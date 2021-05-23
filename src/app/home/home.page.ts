import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import Map from 'ol/Map';

import 'ol/ol.css';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';
import {OrientationService} from '../services/orientation.service';

export interface IPermissions {
  location: boolean;
  orientation: boolean;
}

/**
 *
 * https://capacitorjs.com/docs/v3/apis/geolocation
 * https://capacitorjs.com/docs/apis/motion
 * https://stackoverflow.com/questions/46132012/using-an-observable-to-detect-a-change-in-a-variable
 *
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('mapRef') mapRef: ElementRef;

  public map!: Map;
  public alpha = -1;
  public position: GeolocationPosition;

  public mapVar;
  private avoidTracking = false;

  constructor(
    private router: Router,
    public platform: Platform,
    public orientationService: OrientationService
  ) {
  }

  async ngOnInit() {
    console.log('ngOnInit');
  }

  async requestMotionPermission() {
    this.orientationService.requestMotionPermission().then(ok => {
      console.log('requestMotionPermission: OK');
    }).catch(err => {
      console.log('requestMotionPermission: ERR');
    });
  }

  goToSEcondPage() {
    this.avoidTracking = true;
    this.router.navigate(['/secondpage']);
  }
}
