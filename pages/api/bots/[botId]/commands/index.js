import middleware from '@/utils/middleware'
import { get } from '@/utils/commands'

export const handler = async (req, res) => {
  if (req.method?.toLowerCase() !== 'get') return res.response.notFound
  return res.response.success({ commands: await get(req, res) })
}

export default middleware(handler)
