import {
  Component,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChange
} from '@angular/core';

import { SVGChessPiece } from '../svg-chess-piece/svg-chess-piece.component';
import { BlockBaseComponent } from './block-base';

@Component({
  selector: '[chess-block]',
  inputs: [
    'block',
    'size'
  ],
  templateUrl: 'svg-chess-block.template.html',
  styleUrls: [ 'svg-chess-block.styles.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SVGChessBlock extends BlockBaseComponent implements OnChanges {
  piece: SVGChessPiece;


  constructor() {
    super();
  }

  ngOnInit() {
    this.setCoordinates();
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if ('block' in changes) {
      this.setCoordinates();
    }
  }
}
