import Base from './_base'
import { get } from './index'

export default class List extends Base {
  id = 'list'
  desc = 'List all the commands not hidden and enabled.'

  async run(req, res) {
    req.query.commandId = undefined
    this.text = `Commands: ${(await get(req, res))
      .filter(command => !command.hidden && command.enabled)
      .map(command => command.id)
      .sort()
      .join(',')}`
    return super.run(req, res)
  }
}
