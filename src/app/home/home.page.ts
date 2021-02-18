import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {
  GeolocationPosition,
  Plugins,
} from '@capacitor/core';

const { Geolocation, Motion } = Plugins;

import Map from 'ol/Map';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile.js';

import 'ol/ol.css';

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
export class HomePage implements OnChanges, OnInit {

  @ViewChild('mapRef') mapRef: ElementRef;

  private map!: Map;
  private alpha = -1;
  private position: GeolocationPosition;

  public mapVar;

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges', changes);
  }

  async ngOnInit() {
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

  async getOrientation() {
    try {
      await DeviceMotionEvent.requestPermission();
    } catch (e) {
      console.log('=>', e);
    }

    // Once the user approves, can start listening:
    Motion.addListener('orientation', (event) => {
      console.log(event);
      this.alpha = event.alpha;
    });
  }

  async watchGeolocation() {
    Geolocation.watchPosition({}, (position, err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('watch');
        this.setPosition(position);
      }
    });
  }
  getGeolocation() {
    Geolocation.getCurrentPosition().then( (x) => {
      this.position = x;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  private setPosition(position: GeolocationPosition) {
    this.position = position;
  }

  private sM() {
    this.map.updateSize();
  }
}
