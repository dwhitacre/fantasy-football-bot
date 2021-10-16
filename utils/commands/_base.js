export default class Base {
  id = undefined
  text = undefined
  url = undefined
  enabled = true
  hidden = false

  get usage() {
    return `!${this.id}`
  }

  get valid() {
    return !!this.id
  }

  async run(req, res) {
    if (!req.query?.botId) return res.response.noop({ msg: 'missing bot id', command })
    if (!this.text & !this.url) return res.response.noop({ msg: 'no message nor url', command })

    const resp = await req.groupme.bots.post(req.query.botId, this.text, this.url)
    if (!resp) return res.response.badGateway

    return res.response.success
  }

  constructor(props = {}) {
    Object.entries(props).forEach(([key, value]) => (this[key] = value))
  }
}
