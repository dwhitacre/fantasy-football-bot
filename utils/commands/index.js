import { parseCommand } from '@/utils/middleware/sheets'
import Help from './help'
import List from './list'
import Version from './version'
import WhatsNew from './whatsnew'

const defaultCommands = [Help, List, Version, WhatsNew]

export async function get(req, res) {
  const rows = await req.sheets.rows()
  if (!rows) throw res.response.badGateway

  const commands = defaultCommands
    .concat(rows.map(parseCommand))
    .reduce((cs, Command) => {
      const command = new Command()
      const existing = cs.find(c => c.id === command.id)
      if (existing) Object.assign(existing, command)
      else cs.push(command)
      return cs
    }, [])
    .filter(command => command.valid)

  if (req.query?.commandId) return commands.find(command => command.id === req.query.commandId)
  return commands
}
