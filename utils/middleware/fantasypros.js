import f from '../fetch'

const internals = {
  cache: undefined,
  time: undefined,
  expiry: process.env.FP_MPB_CACHE_EXPIRY || 60000,
}

export default function fantasypros(req) {
  const api = f(process.env.FP_MPBBASEURL)

  req.fantasypros = {
    api,
    async ranks() {
      if (!internals.time || (internals.time && internals.expiry < Date.now() - internals.time)) {
        internals.time = Date.now()
        try {
          return (internals.cache = {})
        } catch (err) {
          req.log.error({ err: err.message }, 'error: fantasypros ranks')
        }
      } else if (internals.cache) {
        req.log.debug({}, 'using fantasypros cache')
        return internals.cache
      }
    },
  }
}
