import { GoogleSpreadsheet } from 'google-spreadsheet'
import Base from '@/utils/commands/_base'

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID)

export default function sheets(req) {
  req.sheets = {
    doc,
    async rows() {
      try {
        await doc.useServiceAccountAuth(JSON.parse(process.env.GOOGLE_SHEETS_SA))
        await doc.loadInfo()
        return doc.sheetsByTitle['Commands']?.getRows()
      } catch (err) {
        req.log.error({ err }, 'error: sheets rows')
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
