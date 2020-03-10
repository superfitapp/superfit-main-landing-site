import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoLoaderDirective } from './photo-loader.directive';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../environments/environment';
require('@firebase/storage');

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
  ],
  declarations: [
    PhotoLoaderDirective
  ],
  exports: [
    PhotoLoaderDirective
  ],
})
export class PhotoLoaderModule { }
