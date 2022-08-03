const {createLogger,transport,format, transports} = require("winston")

const customerLogger = createLogger({
    transports : [
        new transports.File({
            filename : "success.log",
            level : "info",
            format : format.combine(format.timestamp(),format.json())

        }),
        new transports.File({
            filename : "error.log",
            level : "error",
            format : format.combine(format.timestamp(),format.json())

        }), 

    ]
})

module.exports = {customerLogger}