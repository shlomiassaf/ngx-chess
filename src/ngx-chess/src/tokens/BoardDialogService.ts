export interface BoardDialogMessage {
  title: string;
  message: string;
  blocking?: boolean;
}

export abstract class BoardDialogService {
  abstract showMessage(msg: BoardDialogMessage, rect?: ClientRect): Promise<void>;
}