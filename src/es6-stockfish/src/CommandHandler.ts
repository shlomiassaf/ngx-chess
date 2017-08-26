import { UCI_MSG_IN } from './enums';

export interface CommandRouteHandler {
  /**
   * A contract for a router handler function.
   *
   * @param cmd The command (first token) after transformCommand() transformation.
   *        If transformCommand not implemented then string.
   * @param tokens All tokens following the command.
     */
  (cmd: any, tokens: string[]): void;
}

export abstract class CommandRouter {
  protected __debug__: boolean;

  /**
   * @param defaultHandler Handle known commands that doesn't have a specific handler.
   * @param unknownHandler Handle unknown commands.
   */
  constructor(defaultHandler?: CommandRouteHandler, unknownHandler?: CommandRouteHandler) {
    defaultHandler && Object.defineProperty(this, 'defaultHandler', { value: defaultHandler });
    unknownHandler && Object.defineProperty(this, 'unknownHandler', { value: unknownHandler });
  }

  /**
   * Handle a command.
   * The command is a space separated string, where the first token is used to navigate and invoke
   * the proper handler.
   * The schema for creating a handle is setting a function in the format of xxxHandler where
   * xxx is the name of the first token.
   * Handlers should have 1 parameter of type string which holds the tokens WITHOUT the first token.
   * @param msg
   * @returns {any}
   */
  protected route(msg: string): void {
    if (this.__debug__) console.log(msg);
    const tokens = msg.split(' '),
          cmd = this.transformCommand(tokens.shift());

    return this[this._getHandlerName(cmd)](cmd, tokens);
  }

  private _getHandlerName(cmd: string): string {
    let fnName = this.getHandlerName(cmd);

    if (fnName) {
        fnName = typeof this[fnName] === 'function' ? fnName : 'defaultHandler';
    }
    else {
      fnName = 'unknownHandler';
    }

    return fnName;
  }

  protected transformCommand(cmd: string): any {
    return cmd;
  }

  protected abstract getHandlerName(cmd: any): string;

  protected defaultHandler(cmd: any, tokens: string[]) {};
  protected unknownHandler(cmd: any, tokens: string[]) {};
}


export class UCICommandRouter extends CommandRouter {

  protected transformCommand(cmd: string): any {
    //convert string to enum
    return UCI_MSG_IN[cmd] || cmd;
  }

  protected getHandlerName(cmd: UCI_MSG_IN): string {
    // now we convert back to string for func name
    return cmd >= 0 ? UCI_MSG_IN[cmd] + 'Handler' : undefined;
  }
}
