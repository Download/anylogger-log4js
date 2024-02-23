import anylogger, {
  type LogLevel,
  type Logger,
  type Extension,
  type Adapter,
} from 'anylogger'


import log4js from 'log4js'

const extension: Extension = (logfn) => {
  const logger = log4js.getLogger(logfn.name)
  for (const level in anylogger.levels) {
    (logfn as Logger)[level] = level == 'log'
      ? ((message: any, ...args: any[]) => logger.debug(message, ...args))
      : ((message: any, ...args: any[]) => (logger as any)[level](message, ...args))
  }
  (logfn as Logger).enabledFor = (level) => {
    const arg = level == 'log' ? 'debug' : level
    return logger.isLevelEnabled(arg)
  }
  return logfn as Logger;
}

const adapter: Adapter = (anylogger) => {
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
  anylogger.ext = extension;
}

export default adapter

// back compat
adapter(anylogger)
