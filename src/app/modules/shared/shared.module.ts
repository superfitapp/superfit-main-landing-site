import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultNavigationComponent } from '../../default-navigation/default-navigation.component';
import { PhotoLoaderModule } from '../photo-loader/photo-loader.module';
import { LazyImageModule } from '../lazy-image/lazy-image.module';

@NgModule({
  declarations: [
    DefaultNavigationComponent
  ],
  exports: [
    DefaultNavigationComponent
  ],
  imports: [
    CommonModule,
    LazyImageModule,
    PhotoLoaderModule,
  ]
})
export class SharedModule {

}
