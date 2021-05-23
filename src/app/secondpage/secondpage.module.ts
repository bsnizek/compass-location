import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecondpagePageRoutingModule } from './secondpage-routing.module';

import { SecondpagePage } from './secondpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecondpagePageRoutingModule
  ],
  declarations: [SecondpagePage]
})
export class SecondpagePageModule {}
