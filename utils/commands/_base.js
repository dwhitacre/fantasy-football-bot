export default class Base {
  id = undefined
  msg = undefined
  url = undefined
  enabled = true
  hidden = false

  get usage() {
    return `!${this.id}`
  }

  get valid() {
    return !!this.id
  }

  constructor(props = {}) {
    Object.entries(props).forEach(([key, value]) => (this[key] = value))
  }
}
