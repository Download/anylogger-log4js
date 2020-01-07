var fs = require('fs')
// be cool and use anylogger to print the logging in the build of anylogger-log4js :)
var log = require('anylogger')('anylogger-log4js')

var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
var v = pkg.version
var av = pkg.devDependencies.anylogger.substring(1)

var readme = fs.readFileSync('./README.md', 'utf-8')
readme = readme.replace(/\<sub\>\<sup\>\d(\d)?\.\d(\d)?\.\d(\d)?\<\/sup\>\<\/sub\>/g, `<sub><sup>${v}</sup></sub>`)
readme = readme.replace(/anylogger-log4js\@\d(\d)?\.\d(\d)?\.\d(\d)?\//g, `anylogger-log4js@${v}/`)
readme = readme.replace(/anylogger\@\d(\d)?\.\d(\d)?\.\d(\d)?\//g, `anylogger@${av}/`)
readme = readme.replace(/\>\=\d(\d)?\.\d(\d)?\.\d(\d)?/g, `>=${v}`)
fs.writeFileSync('README.md', readme, 'utf8')
log.info('Updated README')
