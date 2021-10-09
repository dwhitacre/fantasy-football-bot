import f from '../fetch'

export default function groupme(req) {
  const api = f(process.env.GROUPME_BASE_URL, { headers: { 'X-Access-Token': process.env.GROUPME_TOKEN } })

  req.groupme = {
    api,
    bots: {
      post(text, url) {
        return api(
          'bots/post',
          {
            id: process.env.GROUPME_BOTID,
            text,
            picture_url: url,
          },
          { method: 'POST' },
        ).catch(req.log.error)
      },
    },
  }
}
