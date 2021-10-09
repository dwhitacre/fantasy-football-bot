import Test from './test'

const commands = [Test].map(Command => new Command()).filter(command => command.valid)

export async function get(id) {
  if (id) return commands.find(command => command.id === id)
  return commands
}