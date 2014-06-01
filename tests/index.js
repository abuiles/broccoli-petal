var assert      = require('assert');
var astEquality = require('esprima-ast-equality');
var fs          = require('fs');
var rimraf      = require('rimraf');

afterEach(function() {
  rimraf.sync('temp');
});

it('transforms anonymous modules to named', function() {
  var generated = fs.readFileSync('temp/main.js'),
      expected  = fs.readFileSync('tests/fixtures/expected.js');
  astEquality(generated, expected);
});
