import middleware from '@/utils/middleware'
import { handler as commandHandler } from '@/pages/api/bots/[botId]/commands/[commandId]/run'

export const handler = (req, res) => {
  if (req.method?.toLowerCase() !== 'post') return res.response.notFound

  if (!req.body?.text) return res.response.badRequest
  if (req.body?.system) return res.response.noop({ msg: 'system message' })
  if (req.body?.sender_type === 'bot') return res.response.noop({ msg: 'bot message' })

  const text = req.body.text.trim()
  if (text.length <= 1) return res.response.noop({ msg: 'no message' })

  const tokens = text.split(' ')
  if (tokens.length <= 0) return res.response.noop({ msg: 'no tokens' })

  const potentialCommand = tokens.find(token => token.startsWith('!'))
  if (!potentialCommand) return res.response.noop({ msg: 'no command' })

  const commandId = potentialCommand.slice(1)
  if (!commandId) return res.response.noop({ msg: 'rouge !' })
  req.query.commandId = commandId

  req.log.debug({ commandId }, 'forwarding request to command handler')
  return commandHandler(req, res)
}

export default middleware(handler)
