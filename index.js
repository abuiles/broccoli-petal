var Filter = require('broccoli-filter');
var Leaf    = require('leaf');
var path     = require('path');
var escodegen = require('escodegen');

module.exports = BroccoliRemap;

BroccoliRemap.prototype = Object.create(Filter.prototype);
BroccoliRemap.prototype.constructor = BroccoliRemap;

function BroccoliRemap (inputTree, options) {
  if (!(this instanceof BroccoliRemap)) return new BroccoliRemap(inputTree, options);

  Filter.call(this, inputTree, options);
  this.options = options || {};
}

BroccoliRemap.prototype.extensions = ['js'];
BroccoliRemap.prototype.targetExtension = 'js';

BroccoliRemap.prototype.processString = function (source, destDir) {
  var leaf = new Leaf(destDir, source);

  if (leaf.hasDefine() && leaf.isAnonymous){
    var name = this.options.name;
    var fileName = path.basename(destDir, '.js');

    if (fileName !== 'main') {
      name = name + '/' + fileName;
    }

    var remaped = leaf.remap(name);
    source = escodegen.generate(remaped.ast);
  }

  return source;
};
