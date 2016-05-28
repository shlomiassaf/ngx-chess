import {
  Component,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChange
} from '@angular/core';

import { SVGChessPiece } from '../index';
import { BlockBaseComponent } from './block-base';

@Component({
  selector: '[chess-block]',
  inputs: [
    'block',
    'size'
  ],
  template: require('./svg-chess-block.template.html'),
  styles: [ require('./svg-chess-block.styles.css') ],
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
