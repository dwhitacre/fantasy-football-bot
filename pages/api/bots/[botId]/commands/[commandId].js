import middleware from '@/utils/middleware'
import { get } from '@/utils/commands'

export const handler = async (req, res) => {
  if (req.method?.toLowerCase() !== 'post') return res.response.notFound

  const command = await get(req, res)

  if (!command) return res.response.noop({ msg: 'no matching command', commandId: req.query.commandId })
  req.log.debug({ command }, 'found command')

  if (!command.enabled) return res.response.noop({ msg: 'command not enabled', commandId: req.query.commandId })
  req.log.debug({ command }, 'command enabled, running..')

  return command.run(req, res)
}

export default middleware(handler)
