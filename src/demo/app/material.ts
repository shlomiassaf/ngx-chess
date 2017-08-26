import { NgModule } from '@angular/core';
import {
  MdRippleModule,
  OverlayModule,
  CompatibilityModule,
  MdButtonToggleModule,
  MdButtonModule,
  MdCheckboxModule,
  MdRadioModule,
  MdSelectModule,
  MdSlideToggleModule,
  MdSliderModule,
  MdSidenavModule,
  MdListModule,
  MdGridListModule,
  MdCardModule,
  MdChipsModule,
  MdIconModule,
  MdProgressSpinnerModule,
  MdProgressBarModule,
  MdInputModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
  MdMenuModule,
  MdDialogModule,
  MdAutocompleteModule,
  StyleModule,
  MdExpansionModule,
  MdSortModule,
  MdPaginatorModule
} from '@angular/material';

import {
  A11yModule,
  BidiModule,
  CdkTableModule,
  ObserveContentModule,
  PlatformModule,
  PortalModule
} from '@angular/cdk';


const MATERIAL_MODULES = [
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdChipsModule,
  MdCheckboxModule,
  CdkTableModule,
  MdDialogModule,
  MdExpansionModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
  OverlayModule,
  StyleModule,
  CompatibilityModule,
  A11yModule,
  BidiModule,
  CdkTableModule,
  ObserveContentModule,
  PlatformModule,
  PortalModule,
  MdSortModule,
  MdPaginatorModule,
];


@NgModule({
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES,
})
export class MaterialModule {
}
