const fs = require('fs');

import {Expr, Fun, magic, generate} from './lib.js';

const M = magic;

M.fun.add = () => $x + $y;

M.fun.main = () => {
  const x = 2;
  const y = 3;
  const z = M.fun.add();
  return z;
};

eval(M.fun.main);

console.log(out);
