import { toFilter } from '../../../../../core/utils/criteria'

const equals = (left, right) => {
  return left.toLowerCase() === right.toLowerCase()
}

const notEquals = (left, right) => {
  return left.toLowerCase() !== right.toLowerCase()
}

const evaluate = async (filter, data) => {

  if(filter.$and) {
    return await Promise.reduce(filter.$and, async (found, condition) => {
      return found === false ? found : await evaluate(condition, data)
    }, null)
  }

  if(filter.$or) {
    return await Promise.reduce(filter.$or, async (found, condition) => {
      return found === true ? found : await evaluate(condition, data)
    }, null)
  }

  const key = Object.keys(filter)[0]

  const left = data[key]

  const comparison = Object.keys(filter[key])[0]

  const right = Object.values(filter[key])[0]

  if(comparison === '$eq') return equals(left, right)

  if(comparison === '$neq') return notEquals(left, right)

  return false

}

const ifthen = async (req, params) => {

  const { config, enrollment, step } = params

  const { branches } = config

  await enrollment.load(['response'], {
    transacting: req.trx
  })

  const response = enrollment.related('response')

  const data = {
    ...params.data,
    ...response.get('data')
  }

  const branch = await Promise.reduce(branches, async (found, branch) => {
    const filter = toFilter(branch.criteria)
    return found || await evaluate(filter, data) ? branch : null
  }, null) || { code: 'else', name: 'else' }

  return {
    data: {
      branch: branch.name
    },
    condition: {
      parent: step.get('code'),
      answer: branch.code,
      delta: -1
    }
  }

}

export default ifthen
