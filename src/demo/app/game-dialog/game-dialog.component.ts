import { Component, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { BoardDialogMessage } from 'ngx-chess';

@Component({
  selector: 'game-dialog',
  styleUrls: [ 'game-dialog.component.scss' ],
  templateUrl: 'game-dialog.component.html'
})
export class GameDialogComponent {

  constructor(private dialogRef: MdDialogRef<any>, @Inject(MD_DIALOG_DATA) public data: BoardDialogMessage) {

  }
}