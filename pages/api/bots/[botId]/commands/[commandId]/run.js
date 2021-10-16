import middleware from '@/utils/middleware'
import { get as getCommand } from '@/utils/commands'

export const handler = async (req, res) => {
  const { commandId } = req.query
  const command = await getCommand(commandId)

  if (!command) return res.response.noop({ msg: 'no matching command', commandId })
  req.log.debug({ command }, 'found command')

  if (!command.enabled) return res.response.noop({ msg: 'command not enabled', commandId })
  req.log.debug({ command }, 'command enabled, running..')

  return command.run(req, res)
}

export default middleware(handler)
