import anylogger, {
  type LogFunction,
  type LogLevel,
  type Logger,
} from 'anylogger'

import log4js from 'log4js'

// make level numbers compatible with log4js
anylogger.levels = {
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
anylogger.ext = (logfn: LogFunction): Logger => {
  const logger = log4js.getLogger(logfn.name)
  for (const level in anylogger.levels) {
    (logfn as Logger)[level as LogLevel] = level == 'log'
    ? ((message: any, ...args: any[]) => logger.debug(message, ...args)) :
      ((message: any, ...args: any[]) => logger[level as LogLevel](message, ...args))

  }
  (logfn as Logger).enabledFor = (level?: LogLevel): boolean | void => {
    var arg = level == 'log' ? 'debug' : level
    var result = logger.isLevelEnabled(arg)
    return result
  }

  return logfn as Logger;
};
