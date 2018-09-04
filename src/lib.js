const esprima = require('esprima');

const escodegen = require('escodegen');

function expr(s) {
  return esprima.parse(s).body;
};

function dump(o) {
  console.log(JSON.stringify(o, null, 2));
}

export function Expr(expr) {
  const me = this;

  this.expr = expr;
  this.parsed = esprima.parse(expr);
}

export function Fun(name) {
  const me = this;

  this.name = name;

  this.generate = function() {
    const template = expr("function name() {}");
    dump(template);
    template[0].body.name = me.name;
    return template;
  };
}

export function generate(obj) {
  const template = esprima.parse("");
  const ast = obj.generate();
  template.body = ast;
  dump(template);
  const gen = escodegen.generate(template);
  return gen;
}
