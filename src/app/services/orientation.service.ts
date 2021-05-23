import {Injectable} from '@angular/core';

import {PluginListenerHandle} from '@capacitor/core';
import {Observable, Subject} from 'rxjs';

import {Motion} from '@capacitor/motion';

@Injectable({
  providedIn: 'root'
})
export class OrientationService {

  private subject = new Subject<any>();
  private handler: PluginListenerHandle;

  constructor() {
  }

  subscribeOrientation() {
    console.log('OrientationService.subscribe()');
    Motion.addListener('orientation', async (event) => {
      console.log('Service Motion: ', event.alpha);
      this.subject.next(event);
    }).then(x => {
      this.handler = x;
      console.log('handler: ', this.handler);
    }).catch((y => {console.log(''); }));
    console.log('Handler ', this.handler);
  }

  unsubscribeOrientation() {
    this.handler.remove().then(r => {
      console.log('Handler REMOVED:: ', r);
    });
  }

  /**
   * Get the permission to read the motion sensor.
   */
  async requestMotionPermission(): Promise<any> {
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
      console.log('OS: waiting for requestPermission()');
      await DeviceMotionEvent.requestPermission();
      return true;
    } else {
      console.log('OS: No requestPermission function .... moving on.');
      return true;
    }
  }

  /**
   * Subscribe to this one in order to get the orientation event like so:
   * this.orientationService.getOrientation().subscribe(event => {
   *    console.log('getOrientation() SUBSCRIBED', event);
   *    this.alpha = event.alpha;
   *    });
   */
  getOrientation(): Observable<any> {
    console.log('OrientationService getOrientation()');
    return this.subject.asObservable();
  }

  resumeOrientation() {
    this.subscribeOrientation();
  }
}
