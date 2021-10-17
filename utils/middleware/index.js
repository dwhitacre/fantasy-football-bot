import log from './log'
import token from './token'
import groupme from './groupme'
import response from './response'
import sheets from './sheets'

export default function middleware(handler, exclude = []) {
  return async (req, res) => {
    let handled = () => res.status(500)

    if (!exclude.includes('log')) log(req)
    if (!exclude.includes('response')) response(res)

    try {
      if (!exclude.includes('token')) token(req, res)
      if (!exclude.includes('groupme')) groupme(req)
      if (!exclude.includes('sheets')) sheets(req)

      handled = await handler(req, res)
    } catch (err) {
      if (err instanceof Error) {
        req.log?.error ? req.log.error(err) : console.error(err)
        err = res.response?.error ?? handled
      }

      handled = err
    }

    if (typeof handled === 'function') handled()

    req.log.debug({ resBody: res.body }, 'response body')
    req.log.info({ resStatus: res.statusCode }, 'finished handling request')
  }
}
