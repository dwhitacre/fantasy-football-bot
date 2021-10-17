import f from '../fetch'

export default function groupme(req) {
  const api = f(process.env.GROUPME_BASE_URL, { headers: { 'X-Access-Token': process.env.GROUPME_TOKEN } })

  req.groupme = {
    api,
    bots: {
      async post(botId, text, url) {
        return api(
          'bots/post',
          {
            bot_id: botId,
            text,
            picture_url: url,
          },
          { method: 'POST' },
        )
          .then(resp => {
            req.log.debug({ status: resp.status, statusText: resp.statusText }, 'groupme bots/post')
            return true
          })
          .catch(err => req.log.error({ err: err.message }, 'error: groupme bots/post'))
      },
    },
  }
}
