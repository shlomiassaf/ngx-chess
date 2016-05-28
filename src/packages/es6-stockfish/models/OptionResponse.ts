
const INFO_MAPPER = (function() {
  // NOTE: This could be done with REGEX as well, probably shorter.

  const reservedTokens = ['name', 'type', 'default', 'min', 'max'];

  // for adjacent key/value in the array
  const simpleNextItem = (index: number, arr: any[]) => {
    return {
      jump: 1,
      value: arr[index + 1]
    }
  };

  // for adjacent key/value in the array
  const nameResolver = (index: number, arr: any[]) => {
    const value = [], len = arr.length;
    let idx = index + 1, jump = 0;

    for (idx; idx < len; idx++) {
      if (reservedTokens.indexOf(arr[idx]) === -1) {
        value.push(arr[idx]);
        jump++;
      } else { break; }
    }

    return {
      jump: jump,
      value: value.join(' ')
    }
  };

  /**
   * Returns a casting map function according to the type.
   * @param index
   * @param arr
   * @returns {{jump: number, value: (function(any): any)}}
   */
  const typeResolver = (index: number, arr: any[]) => {
    let idx = index + 1, value: (v) => any;
    switch (arr[idx]) {
      case 'check':
        value = (v) => v === 'true' ? true : false;
        break;
      case 'spin':
        value = (v) => Number(v);
        break;
      default:
        value = (v) => v;
        break;
    }
    return {
      jump: 1,
      value: value
    }
  };

  const mapper: any = {
    name: nameResolver,
    type: typeResolver,
    default: simpleNextItem,
    min: simpleNextItem,
    max: simpleNextItem
  };

  return mapper;
})();

/**
 * Represents an incoming "option" line.
 * Example: option name Write Debug Log type check default false
 */
export class OptionResponse<T> {
  constructor(tokens: string[]) {
    let idx = 0, len = tokens.length;
    if(tokens[idx] === 'name') {
      let mappedInfo = INFO_MAPPER.name(idx++, tokens); // the jump does not take into account current
      this.name = mappedInfo.value;
      this.propName = this.name.replace(/\s/g, '').replace('(', '$').replace(')', '$');
      
      if(tokens[idx += mappedInfo.jump] === 'type') {
        let caster = INFO_MAPPER.type(idx, tokens).value;

        for (idx += 2; idx < len; idx++) {
          let prop = tokens[idx];
          if (prop in INFO_MAPPER) {
            mappedInfo = INFO_MAPPER[prop](idx, tokens);
            idx += mappedInfo.jump;
            this[prop] = caster(mappedInfo.value);
          }
        }
        if ('default' in this) {
          this.value = this.default;
        }
      }
    }
  }
  name: string;
  default: T;
  value: T;

  min: T;
  max: T;

  /**
   * A transformation of 'name' for internal use.
   * propName is used as an object property name in meta.option
   */
  propName: string
}

export interface CheckOptionResponse extends OptionResponse<boolean> {}
export interface SpinOptionResponse extends OptionResponse<number> {}
export interface StringOptionResponse extends OptionResponse<string> {}
