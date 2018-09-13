const esprima = require('esprima');

const escodegen = require('escodegen');

const fs = require('fs');

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

function walkInner(parentNode, parentProp, node, f) {
  if (node !== null && node !== undefined && node.hasOwnProperty('type')) {
    for (const prop in node) {
      const value = node[prop];
      if (node.type == 'Program' && prop == 'tokens') {
        /* Don't process the raw tokens, only AST */
        continue;
      } else if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          walkInner(node, prop, value[i], f);
        }
      } else {
        walkInner(node, prop, value, f);
      }
    }
    if (node.type === 'Identifier') {
      f(node);
    }
  }
}

function walk(node, f) {
  walkInner(null, null, node, f);
}

const funHandler = {
  set: function(obj, prop, value) {
    const fs = '' + value;
    const efs = esprima.parse(fs);
    const names = [];
    walk(efs, node => {
      if (node.name.startsWith('$')) {
        names.push(node.name.replace('$', ''));
      }
    });
    for (const name of names) {
      efs.body[0].expression.params.push({
        type: 'Identifier',
        name: name
      });
    }
    // dump(esprima.parse("(x, y) => x + y;"));
    const newValue = escodegen.generate(efs);
    dump(newValue);
    obj[prop] = newValue;
    return true;
  }
};

export const funProxy = new Proxy({}, funHandler);

const xpoHandler = {
  set: function(obj, prop, value) {
    obj[prop] = value;
    return true;
  }
};

export const xpoProxy = new Proxy({}, xpoHandler);

export const magic = {
  fun: funProxy, 
  xpo: xpoProxy,
};
