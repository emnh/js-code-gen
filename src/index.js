const fs = require('fs');

import {Expr, Fun, generate} from './lib.js';

var p = new Program({
  add: x + y,
  main: () => {
    x = 2;
    y = 3;
    join(add);
  }
});

p = p.Fun("add").push(function() {
  return x + y;
});

var f = new Fun("add");

var main = new Fun("main");

var out = generate(main);

console.log(out);
