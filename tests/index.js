var assert      = require('assert');
var astEquality = require('esprima-ast-equality');
var fs          = require('fs');
var rimraf      = require('rimraf');

after(function() {
  rimraf.sync('temp');
});

it('transforms anonymous modules to named', function() {
  var generated = fs.readFileSync('temp/main.js'),
      expected  = fs.readFileSync('tests/fixtures/expected-main.js');
  astEquality(generated, expected);
});

it('removes dots from module name', function() {
  var generated = fs.readFileSync('temp/minified.min.js'),
      expected  = fs.readFileSync('tests/fixtures/expected-minified.js');
  astEquality(generated, expected);
});

it('snake case module name', function() {
  var generated = fs.readFileSync('temp/foo_bar.js'),
      expected  = fs.readFileSync('tests/fixtures/expected-foo-bar.js');
  astEquality(generated, expected);
});
