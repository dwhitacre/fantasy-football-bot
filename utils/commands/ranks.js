import Base from './_base'
import { get } from './index'

export default class Ranks extends Base {
  id = 'ranks'
  desc = 'Display the FantasyPros power rankings.'

  async run(req, res) {
    this.text = 'Empty'
    return super.run(req, res)
  }
}
