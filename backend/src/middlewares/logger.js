const log4js = require('log4js');
const path = require('path');

log4js.configure({
    appenders: {
        loggerDev: {type: "console"},
        loggerWarning: {type: "file", filename: path.join(process.cwd(), "/src/logs/warn.log")},
        loggerError: {type: "file", filename: path.join(process.cwd(), "/src/logs/error.log")}
    },
    categories: {
        default: {appenders: ["loggerDev"], level: "all"},
        warn: {appenders: ["loggerWarning"], level: "warn"},
        error: {appenders: ["loggerError"], level: "error"}
    }
});


module.exports = {
    log4js
};