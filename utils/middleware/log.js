import pino from 'pino'
import { v4 as uuid } from 'uuid'
import url from 'url'

const logger = pino({
  redact: ['req.headers.authorization', 'token', '*.token'],
  prettyPrint: process.env.NODE_ENV !== 'production',
  level: process.env.LOG_LEVEL || 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
})

export default function log(req) {
  req.log = logger.child({ reqId: uuid(), reqPath: url.parse(req.url).pathname })
  req.log.info('request received')
  req.log.debug({ reqBody: req.body ?? '<empty>', reqQuery: req.query ?? '<empty>' }, 'request information')
}
