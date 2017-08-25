import { OPTION_NAME, FishWrap } from '../index';

export class OptionRequest {
  /**
   * restrict search to this moves only
   * Example: After "position startpos" and "go infinite searchmoves e2e4 d2d4"
   * the engine should only search the two moves e2e4 and d2d4 in the initial position.
   */
  name: OPTION_NAME;

  value: any;
  
  
  get propName(): string {
    return OPTION_NAME.asStr(this.name);
  }
  
  $request(): string {
    return `setoption name ${OPTION_NAME.asSFStr(this.name)} ${this.value ? 'value ' + this.value : ''}`;
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
