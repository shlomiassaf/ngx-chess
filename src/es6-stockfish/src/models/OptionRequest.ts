import { OPTION_NAME } from '../enums';
import { FishWrap } from '../fishwrap';
import { enumAsStr } from '../util';

export class OptionRequest {
  /**
   * restrict search to this moves only
   * Example: After "position startpos" and "go infinite searchmoves e2e4 d2d4"
   * the engine should only search the two moves e2e4 and d2d4 in the initial position.
   */
  name: OPTION_NAME;

  value: any;
  
  
  get propName(): string {
    return enumAsStr(OPTION_NAME, this.name);
  }
  
  $request(): string {
    const opName =  enumAsStr(OPTION_NAME, this.name)
      .replace(/([A-Z])/g, ($1) => ' ' + $1)
      .replace(/\$/, ' (')
      .replace(/\$$/, ')')
      .trim();

    return `setoption name ${opName} ${this.value ? 'value ' + this.value : ''}`;
  }
  
  static create(name: OPTION_NAME, value?: any): OptionRequest {
    const or = new OptionRequest();
    or.name = name;
    or.value = value;
    return or;
  }
}

export class OptionRequestFactory {
  $$: OptionRequest = new OptionRequest();
  
  constructor(post: (request: OptionRequest) => FishWrap) {
    if (typeof post === 'function') {
      this.$post = () => post(this.$requestObject())  
    }
    
  }

  $post(): FishWrap {
    throw new Error('Not Implemented');
  }
  
  $requestObject(): OptionRequest {
    return this.$$;
  }

  $request(): string {
    return this.$$.$request();
  }

  name(value: OPTION_NAME): this {
    this.$$.name = value;
    return this;
  }

  /**
   * white has x msec left on the clock
   */
  value(value: any): this {
    this.$$.value = value;
    return this;
  }

}
