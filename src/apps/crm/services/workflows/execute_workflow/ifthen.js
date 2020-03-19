import { toFilter } from '../../../../../core/utils/criteria'

const equals = (left, right) => {
  return left.toLowerCase() === right.toLowerCase()
}

const notEquals = (left, right) => {
  return left.toLowerCase() !== right.toLowerCase()
}

const known = (left) => {
  return left !== null && left.length > 0
}

const notKnown = (left) => {
  return left === null || left.length === 0
}

const like = (left, right) => {
  return left !== null && left.search(right) >= 0
}

const notLike = (left, right) => {
  return left !== null && left.search(right) < 0
}

const getEvaluator = (comparison) => {
  if(comparison === '$eq') return equals
  if(comparison === '$neq') return notEquals
  if(comparison === '$kn') return known
  if(comparison === '$nkn') return notKnown
  if(comparison === '$lk') return like
  if(comparison === '$nlk') return notLike
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
  const evaluator = getEvaluator(comparison)
  return evaluator(left, right)

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
    if(found !== null) return found
    const filter = toFilter(branch.criteria)
    return await evaluate(filter, data) ? branch : null
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
