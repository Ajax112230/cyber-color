var fs = require('fs');
var s = fs.readFileSync('index.html', 'utf8');

var atStart = s.indexOf('var AT=[');
var atEnd = s.indexOf('];', atStart);
var atSrc = s.substring(atStart, atEnd + 2);
atSrc = atSrc.replace('var AT=', 'var AT=');

var cStart = s.indexOf('var C=[');
var cEnd = s.indexOf('];', cStart + 8);
var cSrc = s.substring(cStart, cEnd + 2);
cSrc = cSrc.replace('var C=', 'var C=');

eval(atSrc);
eval(cSrc);

var missing = [];
AT.forEach(function(a) {
  a.c.forEach(function(cn) {
    if (!C.find(function(c) { return c.n === cn; })) {
      missing.push(a.n + ': ' + cn);
    }
  });
});

console.log('Missing colors:', missing.length);
if (missing.length) missing.forEach(function(m) { console.log('  ' + m); });
console.log('Total colors in C:', C.length);
console.log('Total archetypes:', AT.length);
