const _f = ({ baseUrl, path, body = {}, options = {} } = {}) => {
  if (!baseUrl) return Promise.reject(new Error('missing baseUrl'))
  if (!path) return Promise.reject(new Error('missing path'))

  return fetch(`${baseUrl}/${path}`, {
    body: JSON.stringify(body),
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }).then(resp => {
    if (!resp.ok) throw new Error(resp.statusText)
    return resp
  })
}

export default function f(baseUrl, defaultOptions = {}) {
  return (path, body, options = {}) => {
    return _f({ baseUrl, path, body, options: { ...defaultOptions, ...options } })
  }
}
