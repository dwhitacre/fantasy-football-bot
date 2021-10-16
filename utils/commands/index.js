import Help from './help'
import List from './list'

const defaultCommands = [Help, List]

export async function get(id) {
  const commands = defaultCommands.map(Command => new Command()).filter(command => command.valid)
  if (id) return commands.find(command => command.id === id)
  return commands
}
