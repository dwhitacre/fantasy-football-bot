import { parseCommand } from '@/utils/middleware/sheets'
import Help from './help'
import List from './list'

const defaultCommands = [Help, List]

export async function get(req, res) {
  const rows = await req.sheets.rows()
  if (!rows) throw res.response.badGateway

  const commands = defaultCommands
    .concat(rows.map(parseCommand))
    .map(Command => new Command())
    .filter(command => command.valid)

  if (req.query?.commandId) return commands.find(command => command.id === req.query.commandId)
  return commands
}
