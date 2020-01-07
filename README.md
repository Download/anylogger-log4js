# anylogger-log4js <sub><sup>0.2.0</sup></sub>
### Anylogger adapter for log4js

[![npm](https://img.shields.io/npm/v/anylogger-log4js.svg)](https://npmjs.com/package/anylogger-log4js)
[![license](https://img.shields.io/npm/l/anylogger-log4js.svg)](https://opensource.org/licenses/MIT)
[![travis](https://img.shields.io/travis/Download/anylogger-log4js.svg)](https://travis-ci.org/Download/anylogger-log4js)
[![greenkeeper](https://badges.greenkeeper.io/Download/anylogger-log4js.svg)](https://greenkeeper.io/)
![mind BLOWN](https://img.shields.io/badge/mind-BLOWN-ff69b4.svg)

<sup><sub><sup><sub>.</sub></sup></sub></sup>

## What is this?

This is an [anylogger](https://npmjs.com/package/anylogger) adapter for [log4js](https://npmjs.com/package/log4js).

This package is meant for application projects that are using libraries using `anylogger`. By including this adapter in your project, all libraries using `anylogger` will automatically start to use `log4js` as their logging framework.

## Install

Install this adapter, as well as both `anylogger` and `log4js`:

```sh
npm install --save anylogger-log4js anylogger log4js
```

## Include in your application project
This package is meant for application projects. If you are writing a library to be NPM installed into some other project, most likely you should not include any adapter, but instead just use `anylogger` directly.

The `anylogger-log4js` adapter will modify the `anylogger` factory in such a way that the loggers it creates will be logging to `log4js`. 

> When using `log4js`, all logging except for warnings and errors is supressed by default. 
As such, you should make sure to set the log level to INFO or DEBUG [as usual](https://www.npmjs.com/package/log4js#documentation) before expecting to see any output.

To activate the adapter, include it in your application entry point.

### Require

*main.js*
```js
require('anylogger-log4js')
```

### Import

*main.js*
```js
import 'anylogger-log4js'
```

## Logging in the application project
In your application module code, only use anylogger to stay framework independent:

*my-module.js*
```js
import anylogger from 'anylogger'
const log = anylogger('my-module')
log('Logging is simple!')
```

This is helpful if you ever decide to factor out the application module into a separate library.

## log configuration in the application project

Because `anylogger` is simply using `log4js` below the surface, you can use
all the normal configuration mechanisms available for `log4js`.

If you need to control log settings programmatically, just import `log4js` and
use it directly:

*main.js*
```js
// ...
import log4js from 'log4js'
log4js.getLogger('my-module').level = 'info'
// ...
```

## Issues

Add an issue in this project's 
[issue tracker](https://github.com/download/anylogger-log4js/issues) 
to let me know of any problems you find, or questions you may have.


## Copyright

© 2020 by [Stijn de Witt](https://stijndewitt.com). Some rights reserved.


## License

Licensed under the [MIT Open Source license](https://opensource.org/licenses/MIT).
