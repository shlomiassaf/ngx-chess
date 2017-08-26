import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: '[chess-banner]',
  templateUrl: 'svg-chess-dialog.template.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SVGChessBanner {
  @Input() textStyle: any = {
    fill: '#35322a',
    filter: `url('#money')`,
    fontFamily: `'Playfair Display', 'Georgia', serif`,
    fontSize: `80px`,
    fontWeight: 900
  };

  @Input() title: string;
  @Input() message: string;
}
