import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import { Geolocation } from '@capacitor/geolocation';
import { Motion } from '@capacitor/motion';

import Map from 'ol/Map';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile.js';

import 'ol/ol.css';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';
import {LocationAndOrientationService} from '../location-and-orientation.service';

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

  private subject: BehaviorSubject<number>;

  private subjectCounter = 0;
  private permissionsGranted: IPermissions = {
    location: false,
    orientation: false
  };
  private pf = '';
  private avoidTracking = false;

  constructor(
    private router: Router,
    public platform: Platform,
    public locationandorientationservice: LocationAndOrientationService
  ) {

    if (platform.is('ios')) {
      this.pf = 'ios';
    }

    if (platform.is('android')) {
      this.pf = 'android';
    }

    if (platform.is('desktop')) {
      this.pf = 'desktop';
    }

    // Lets set up a hook, triggered when the gps loc is found.
    this.subject = new BehaviorSubject(0);

    this.subject.subscribe((data) => {
      this.subjectCounter += data;
      console.log('subject=', this.subjectCounter);
      if (this.subjectCounter === 110) {
        console.log('GPS and orientation found, moving on', this.subjectCounter, data);
      }
    });
  }

  async ngOnInit() {
    console.log('ngOnInit');
  }

  async _ngOnInit() {
    const osmTiles = new Tile({
      source: new OSM()
    });

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        })],
      target: 'mmap',
      view: new View({
        center: [12.516293785708765, 55.664411051312534],
        zoom: 1
      })
    });
    await this.timeout(1000);
    console.log('updateSize');
    this.map.updateSize();
  }

  async timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  isCompassPermissionGranted() {
    return this.locationandorientationservice.isCompassPermissionGranted();
  }

  subscribeToOrientation() {
    this.locationandorientationservice.subscribeToOrientation().then(ok => {
      console.log('home.subscribeToOrientation() ', ok);
    }).catch(err => {
      console.log('home.subscribeToOrientation() ', err);
    });
  }

  async requestMotionPermission() {
    this.locationandorientationservice.requestMotionPermission().then(ok => {
      console.log('ok');
    }).catch(err => {
      console.log(err);
    });
  }

  getGeolocation() {
    Geolocation.getCurrentPosition().then( (x) => {
      this.position = x;
      this.subject.next(1);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  async watchGeolocation() {
    Geolocation.watchPosition({}, (position, err) => {
      if (err) {
        console.error('WatchPosition ERROR', err);
      } else {
        console.log('Geolocation.watching: ', position);
        this.setPosition(position);
      }
    });
  }

  private setPosition(position: GeolocationPosition) {
    this.position = position;
  }

  private sM() {
    this.map.updateSize();
  }

  goToSEcondPage() {
    this.avoidTracking = true;
    this.router.navigate(['/secondpage']);
  }
}
