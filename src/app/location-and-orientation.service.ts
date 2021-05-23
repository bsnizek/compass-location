import { Injectable } from '@angular/core';
import {IPermissions} from './home/home.page';
import {BehaviorSubject, Observable} from 'rxjs';
import {Motion, OrientationListenerEvent} from '@capacitor/motion';

@Injectable({
  providedIn: 'root'
})
export class LocationAndOrientationService {

  private permissionsGranted: IPermissions = {
    location: false,
    orientation: false
  };
  private subject: BehaviorSubject<number>;

  orientationSuspended = false;

  constructor() {
    this.subject = new BehaviorSubject(0);
  }

  /**
   * Call this on in order to ask the device
   */
  async requestMotionPermission(): Promise<number> {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      try {
        await DeviceMotionEvent.requestPermission();
      } catch (e) {
        return 0;
      }
      // return new Promise(resolve => {});
      return 1;
    } else {
      console.log('requestPermission not a function of DeviceMotionEvent');
      // return new Promise(resolve => {});
      return 2;
    }
  }

  public suspendOrientation() {
    Motion.removeAllListeners();
    this.orientationSuspended = true;
    console.log('Suspended ', this.orientationSuspended);
  }

  public resumeOrientation() {
    this.orientationSuspended = false;
    console.log('Suspended ', this.orientationSuspended);
    this.subscribeToOrientation();
  }

  subscribeToOrientation(): Promise<OrientationListenerEvent> {
    console.log('OrientationService.subscribeToOrientation()');
    const handler = Motion.addListener('orientation', async (event) => {
      console.log('Service Motion: ', event.alpha);
      // this.orientationSubject.next(event);
      if (!this.orientationSuspended) {
        console.log('not suspended');
        return event;
      } else {
        console.log('suspended');
      }
    });
    console.log('Handler ', handler);
    return new Promise(undefined);
  }

  getPermissionsGranted() {
    return this.permissionsGranted;
  }

  isCompassPermissionGranted() {
    return this.permissionsGranted.orientation;
  }

  isOrientationPermissionGranted() {
    return this.permissionsGranted.orientation;
  }

  /**
   * Fires when both compass and location are available.
   */
  subscribeToBothGranted() {
    return this.subject;
  }

}
