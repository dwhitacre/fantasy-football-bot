import middleware from '@/utils/middleware'
import { get as getCommand } from '@/utils/commands'

export const handler = async (req, res) => {
  const { commandId, botId } = req.query
  const command = await getCommand(commandId)

  if (!command) return res.response.noop({ msg: 'no matching command', commandId })

  req.log.debug({ command }, 'running command')

  return res.response.success
}

export default middleware(handler)
