var Filter = require('broccoli-filter');
var Leaf    = require('leaf');
var path     = require('path');
var escodegen = require('escodegen');

module.exports = AmdTranform;

AmdTranform.prototype = Object.create(Filter.prototype);
AmdTranform.prototype.constructor = AmdTranform;

function AmdTranform (inputTree, options) {
  if (!(this instanceof AmdTranform)) return new AmdTranform(inputTree, options);

  Filter.call(this, inputTree, options);
  this.options = options || {};
}

AmdTranform.prototype.extensions = ['js'];
AmdTranform.prototype.targetExtension = 'js';

AmdTranform.prototype.processString = function (source, destDir) {
  var leaf = new Leaf(destDir, source);

  if (leaf.hasDefine && leaf.isAnonymous){
    var name = path.basename(destDir, '.js');
    name     = name.split('.')[0].replace(/_/g, '-');

    leaf.deanonymize(name);
    source = escodegen.generate(leaf.ast);
  }

  return source;
};
