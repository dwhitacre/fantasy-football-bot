export default function token(req, res) {
  if (!req.query?.token || !process.env.TOKEN || req.query.token !== process.env.TOKEN) {
    req.log.error({ token: req.query?.token }, 'failed to provide matching token')
    throw res.response.unauthorized
  }
}
