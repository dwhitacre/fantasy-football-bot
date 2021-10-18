import Base from './_base'
import PackageJson from '../../package.json'

export default class Version extends Base {
  id = 'version'
  desc = 'The version of the bot.'
  text = `Current version: ${PackageJson.version}`
}
