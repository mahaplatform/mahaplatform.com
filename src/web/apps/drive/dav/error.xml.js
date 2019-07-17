import xml from 'xml'

const error = (error) => xml({
  'D:error': [
    { _attr: { 'xmlns:D': 'DAV:' } },
    { [error]: [] }
  ]
}, { declaration: true })

export default error
