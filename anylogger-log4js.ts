import anylogger, {
  type Logger,
  type Adapter,
} from 'anylogger'
import log4js from 'log4js'

const adapter: Adapter = (anylogger, log4js) => {
  // bail early if it was already extended
  if ((anylogger as any).log4js) return
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
  anylogger.ext = (logfn) => {
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
  // set a flag to be able to see that it was extended
  ;(anylogger as any).log4js = log4js
}

export default adapter

// back compat
adapter(anylogger, log4js)
