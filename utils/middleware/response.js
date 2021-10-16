export default function response(res) {
  const ogResJson = res.json
  res.json = json => {
    res.body = json
    return ogResJson.call(res, json)
  }

  res.response = {
    success: json => res.status(200).json({ status: 'ok', ...json }),
    noop: json => res.status(200).json({ status: 'noop', ...json }),
    badRequest: json => res.status(400).json({ status: 'bad request', ...json }),
    unauthorized: json => res.status(401).json({ status: 'not authorized', ...json }),
    error: json => res.status(500).json({ status: 'error', ...json }),
    badGateway: json => res.status(502).json({ status: 'bad gateway', ...json }),
  }
}
