# Angular 2 Chess

A plugin oriented chess component.  

> Angular 2 Chess is in early stages - Still alpha.
> I'v built it in 4 days as a learning experiment that gone wild :)

## Architecture
The module is actually a shell with plugins.  
The shell provides contracts and some building block for the plugins.  
The logic behind a plugin system is that there are different types of chess games. Also, there are already multiple chess implementation's out there, a plugin can wrap an implementation and save a lot of work.  

This approach enables endless game variants.  
It can be games with different rules (engines), or games with different UI (3D, native, different pieces, etc...)  
A UI plugin is a sort of a `Renderer` which means a native implementation is also quite easy.  
 
**There are 3 types of plugins**

### (1) Engine Plugins:
Engine plugins provides the logic, an engine might also implement AI (optional)  
Currently there are 2 engine plugins:  
 
  * Chessjs plugin (an engine that wraps the chess.js library). Does not support AI.
  * Chessjs-AI - Extends the previous engine and adds Stockfish for AI.

#### Chessjs
The `Chessjs` engine is a wrapper around the [Chess.js](https://github.com/jhlywa/chess.js) library.  
The description in the **Chess.js** Github repository says:  
> A Javascript chess library for chess move generation/validation, piece placement/movement, and check/checkmate/draw detection

This means the the `Chessjs` plugin does not support AI, thus only human vs human matches are allowed.

#### Chessjs-AI
The `Chessjs-AI` engine extends (inherits) the `Chessjs` engine and adds AI on top of it using [stockfish.js](https://github.com/nmrugg/stockfish.js).  
**stockfish.js** is a Javascript port of the powerful open-source **Stockfish* engine.  
Stockfish is probably the strongest AI chess engine in Javascript, this comes with a cost - a very big payload size.

**stockfish.js** use the postMessage API since it is intended to run in a web worker.
It is very hard manage async operation's that way and keep a reasonable flow without crazy state management.
To achieve a nice flow I had to wrap it, I ended up building a `Promise API` wrapper around **stockfish.js**  
Using the wrapper makes development super easy as state outside the wrapper is not an issue, the wrapper takes care of it all.  
I will probably post this wrapper as a different library, you can find it in `src/packages/es6-stockfish`

> Thinking Angular, it might sound weird why a Promise API and not Observables? after all postMessage is a classic stream of messages rather then a single event.
There are 2 reasons: (1) Observables not in ES6, this is a big constraint. (2) While stockfish sends a stream of message, they are always in response to a request.
Since a request has a unique response and there are no multiple requests of the same type in the same time - a Promise API is more suitable here.



### (2) UI Plugins:
UI plugins use logic plugins to display the board and allow users to interact with the board.
Currently there is 1 UI plugin:

  * SVG Board - A complete SVG implementation, using angular 2 components and no direct DOM access.
  This plugins use `OnPush` strategy with all of the components for maximum performance.
  
### (3) Controller Plugins:
A controller has 2 responsibilities:

  * Act as a glue between an engine and the UI.
  * Consumer API (provide a simple api (facade) for game management)

Currently controllers are not really plugins, they are intended as such.



## TODOs:

 * Move to **Web Worker**, classic web worker use case.
 * Lazy load the Chessjs-AI plugin
 * More boards / engines?
 * Change DI, board will get controller when new game is set (controller will hold engine via DI)?
 * NPM Publish script + publish