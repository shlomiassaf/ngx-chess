import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { BoardDialogMessage, BoardDialogService } from 'ngx-chess';
import { GameDialogComponent } from './game-dialog.component';

@Injectable()
export class GameDialogService extends BoardDialogService {
  constructor(private dialog: MdDialog) {
    super();
  }

  showMessage(msg: BoardDialogMessage, rect?: ClientRect): Promise<void> {
    const options: MdDialogConfig = {
      data: msg,
      disableClose: msg.blocking
    };
    // if (rect) {
    //   options.width = rect.width + 'px';
    //   options.height = rect.height + 'px';
    //   options.position = {
    //     top: rect.top + 'px',
    //     left: rect.left + 'px'
    //   }
    // }
    return this.dialog.open(GameDialogComponent, options).afterClosed().toPromise();
  }
}