import { GoogleSpreadsheet } from 'google-spreadsheet'
import Base from '@/utils/commands/_base'

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID)

const internals = {
  cache: undefined,
  time: undefined,
  expiry: process.env.GOOGLE_SHEETS_CACHE_EXPIRY || 60000,
}

export default function sheets(req) {
  req.sheets = {
    doc,
    async rows() {
      if (!internals.time || (internals.time && internals.expiry < Date.now() - internals.time)) {
        internals.time = Date.now()
        try {
          await doc.useServiceAccountAuth(JSON.parse(process.env.GOOGLE_SHEETS_SA))
          await doc.loadInfo()
          return (internals.cache = doc.sheetsByTitle['Commands']?.getRows())
        } catch (err) {
          req.log.error({ err: err.message }, 'error: sheets rows')
        }
      } else if (internals.cache) {
        req.log.debug({}, 'using sheets cache')
        return internals.cache
      }
    },
  }
}

export function parseCommand(row) {
  if (!row?.message && !row?.pictureurl) return class Custom extends Base {}
  return class Custom extends Base {
    id = row.command
    text = row.message
    url = row.pictureurl
    desc = row.desc
    enabled = row.disabled !== 'x'
    hidden = row.hidden === 'x'
  }
}
