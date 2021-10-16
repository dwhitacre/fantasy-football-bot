import Base from './_base'
import { get } from './index'

export default class List extends Base {
  id = 'list'

  async run(req, res) {
    this.text = `Commands: ${(await get())
      .filter(command => !command.hidden && command.enabled)
      .map(command => command.id)
      .sort()
      .join(',')}`
    return super.run(req, res)
  }
}
