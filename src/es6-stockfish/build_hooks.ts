import * as Path from 'path';
import * as fs from 'fs-extra';
import * as util from '../../scripts/util';

export function done(): void {
  const meta = util.currentPackage();
  const localPackageJsonPath = util.root(util.FS_REF.SRC_CONTAINER, meta.dir, 'stockfish6.js');
  const copyInst = util.getCopyInstruction(meta);
  const pkgDest = Path.join(copyInst.to, 'stockfish6.js');
  fs.copySync(localPackageJsonPath, pkgDest);
}
