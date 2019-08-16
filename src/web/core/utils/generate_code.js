import _ from 'lodash'

const generateCode = async (req, options = {}) => {
  const key = options.key || 'code'
  const length = options.length || 10
  const { table } = options
  let code = null
  let done = false
  while(!done) {
    code = proposeCode(length)
    done = table === undefined || isUniquene(req, key, table, code)
  }
  return code
}

const isUniquene = async (req, key, table, code) => {
  const items = await req.trx(table).where({ [key]: code })
  return items.length === 0
}

const proposeCode = (length) => {
  return Array(Math.ceil(length / 10)).fill().map(i => {
    return _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
  }).join('').substr(0, length)
}

export default generateCode
