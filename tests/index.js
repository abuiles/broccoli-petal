var assert      = require('assert');
var astEquality = require('esprima-ast-equality');
var fs          = require('fs');
var rimraf      = require('rimraf');

after(function() {
  rimraf.sync('temp');
});

it('remaps main with the module name', function() {
  var generated = fs.readFileSync('temp/main.js'),
      expected  = fs.readFileSync('tests/fixtures/expected-main.js');
  astEquality(generated, expected);
});


it('remaps children under module name', function() {
  var generated = fs.readFileSync('temp/isolated-container.js'),
      expected  = fs.readFileSync('tests/fixtures/expected-isolated-container.js');
  astEquality(generated, expected);
});
