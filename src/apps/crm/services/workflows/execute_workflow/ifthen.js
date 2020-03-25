import { toFilter } from '../../../../../core/utils/criteria'
import _ from 'lodash'

const testNull = (left, right) => {
  return test === null
}

const testNotNull = (left, right) => {
  return test !== null
}

const testEquals = (left, right) => {
  return left.toLowerCase() === right.toLowerCase()
}

const testNotEquals = (left, right) => {
  return left.toLowerCase() !== right.toLowerCase()
}

const testKnown = (left, right) => {
  return left !== null && left.length > 0
}

const testNotKnown = (left, right) => {
  return left === null || left.length === 0
}

const testLike = (left, right) => {
  return left !== null && left.search(right) >= 0
}

const testNotLike = (left, right) => {
  return left !== null && left.search(right) < 0
}

const testIn = (left, right) => {
  return _.includes(right, left)
}

const testNotIn = (left, right) => {
  return !_.includes(right, left)
}

const testContains = (left, right) => {
  return _.includes(left, right)
}

const testNotContains = (left, right) => {
  return !_.includes(left, right)
}

const testLessThan = (left, right) => {
  return left < right
}

const testLessThanEqual = (left, right) => {
  return left <= right
}

const testGreaterThan = (left, right) => {
  return left > right
}

const testGreaterThanEqual = (left, right) => {
  return left >= right
}

const getEvaluator = (comparison) => {
  if(comparison === '$nl') return testNull
  if(comparison === '$nnl') return testNotNull
  if(comparison === '$eq') return testEquals
  if(comparison === '$neq') return testNotEquals
  if(comparison === '$kn') return testKnown
  if(comparison === '$nkn') return testNotKnown
  if(comparison === '$lk') return testLike
  if(comparison === '$nlk') return testNotLike
  if(comparison === '$in') return testIn
  if(comparison === '$nin') return testNotIn
  if(comparison === '$ct') return testContains
  if(comparison === '$nct') return testNotContains
  if(comparison === '$lt') return testLessThan
  if(comparison === '$lte') return testLessThanEqual
  if(comparison === '$gt') return testGreaterThan
  if(comparison === '$gte') return testGreaterThanEqual
}

const evaluateAnd = async (filter, data) => {
  return await Promise.reduce(filter.$and, async (found, condition) => {
    return found === false ? found : await evaluate(condition, data)
  }, null)
}

const evaluateOr = async (filter, data) => {
  return await Promise.reduce(filter.$or, async (found, condition) => {
    return found === true ? found : await evaluate(condition, data)
  }, null)
}

const evaluateCondition = async (filter, data) => {
  const key = Object.keys(filter)[0]
  const left = data[key]
  const comparison = Object.keys(filter[key])[0]
  const right = Object.values(filter[key])[0]
  const evaluator = getEvaluator(comparison)
  return evaluator(left, right)
}

const evaluate = async (filter, data) => {
  if(filter.$and) return evaluateAnd(filter, data)
  if(filter.$or) return evaluateOr(filter, data)
  return evaluateCondition(filter, data)
}

const getBranch = async (branches, data) => {
  return await Promise.reduce(branches, async (found, branch) => {
    if(found !== null) return found
    const filter = toFilter(branch.criteria)
    return await evaluate(filter, data) ? branch : null
  }, null) || { code: 'else', name: 'else' }
}

const ifthen = async (req, params) => {

  const { config, enrollment, step } = params

  await enrollment.load(['response'], {
    transacting: req.trx
  })

  const branch = await getBranch(config.branches, {
    ...params.data,
    ...enrollment.related('response') ? enrollment.related('response').get('data') : {}
  })

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