var a = require('anylogger')
var log4js = require('log4js')

// make level numbers compatible with log4js
a.levels = {
  trace: 5000, 
  debug: 10000,
  log: 10000, // log4js maps log to debug
  info: 20000, 
  warn: 30000,
  error: 40000, 
  fatal: 50000,
  mark: 9007199254740992, // 2^53
};

// override anylogger.ext() to make every log method use log4js
a.ext = function(l,o) {
  o = log4js.getLogger(l.name)
  for (v in a.levels) {
    l[v] = (function(v){
      return function(){
        return (v == 'log' ? o.debug : o[v]).apply(o, arguments)
      }
    })(v)
  }
  l.enabledFor = function(lvl) {
    var arg = lvl == 'log' ? 'debug' : lvl
    var result = o.isLevelEnabled(arg)
    return result
  }
  return l;
};
