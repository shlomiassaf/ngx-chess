const globals = {
  'es6-stockfish': 'es6Stockfish',
  'chess.js': 'chess.js',
  'ngx-chess': 'ngxChess',
  'ngx-chess/plugins/chessjs': 'ngxChess.plugins.chessjs',
};


export function rollupFESM(config) {
  if (config.external) {
    config.external = config.external.concat(Object.keys(globals));
  } else {
    config.external = Object.keys(globals);
  }

  config.globals = Object.assign(config.globals || {}, globals);
}

export const rollupUMD = rollupFESM;
