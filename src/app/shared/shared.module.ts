import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [SideBarComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [SideBarComponent, HeaderComponent]
})
export class SharedModule { }
