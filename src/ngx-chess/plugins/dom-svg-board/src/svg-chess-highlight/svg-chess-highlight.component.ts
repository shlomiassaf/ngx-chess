import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit
} from '@angular/core';

import { BlockBaseComponent } from '../svg-chess-block/block-base';
@Component({
  selector: '[chess-highlight]',
  inputs: [
    'block',
    'size'
  ],
  templateUrl: 'svg-chess-highlight.template.html',
  styleUrls: [ 'svg-chess-highlight.styles.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SVGChessHighlight extends BlockBaseComponent implements OnInit {
  /** @internal */
  active: boolean;

  constructor(private cdr: ChangeDetectorRef) {
    super()
  }

  setCoordinates() {
    super.setCoordinates();
    this.x +=2;
    this.y +=2;
  }

  ngOnInit() {
    this.setCoordinates();
    setTimeout(() => {
      this.active = true;
      this.cdr.markForCheck();
    }, 16);
  }
}
