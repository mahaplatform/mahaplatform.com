import _ from 'lodash'

const castValue = (value) => {
  if(_.isNil(value)) return null
  if(`${value}` === 'true') return true
  if(`${value}` === 'false') return false
  if(/^[\d]+\.?[\d]*$/.test(value)) return Number(value)
  return value.toLowerCase()
}

const testNull = (left, right) => {
  return test === null
}

const testNotNull = (left, right) => {
  return test !== null
}

const testEquals = (left, right) => {
  return castValue(left) === castValue(right)
}

const testNotEquals = (left, right) => {
  return castValue(left) !== castValue(right)
}

const testKnown = (left, right) => {
  if(left === null) return false
  if(_.isString(left) && left.length === 0) return false
  return true
}

const testNotKnown = (left, right) => {
  if(left !== null) return false
  if(_.isString(left) && left.length > 0) return false
  return true
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

const testAn = (left, right) => {
  return left === 'completed'
}

const testNotAn = (left, right) => {
  return left !== 'completed'
}

const testContains = (left, right) => {
  return _.intersection(left, _.castArray(right)).length > 0
}

const testNotContains = (left, right) => {
  return _.intersection(left, _.castArray(right)).length === 0
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

const testSent = (left, right) => {
  return !!left[right] && left[right].was_sent === true
}

const testNotSent = (left, right) => {
  return !left[right] || left[right].was_sent !== true
}

const testDelivered = (left, right) => {
  return !!left[right] && left[right].was_delivered === true
}

const testNotDelivered = (left, right) => {
  return !left[right] || left[right].was_delivered !== true
}

const testOpened = (left, right) => {
  return !!left[right] && left[right].was_opened === true
}

const testNotOpened = (left, right) => {
  return !left[right] || left[right].was_opened !== true
}

const testClicked = (left, right) => {
  return !!left[right] && left[right].was_clicked === true
}

const testNotClicked = (left, right) => {
  return !left[right] || left[right].was_clicked !== true
}

const getEvaluator = (comparison) => {
  if(comparison === '$nl') return testNull
  if(comparison === '$nnl') return testNotNull
  if(comparison === '$eq') return testEquals
  if(comparison === '$neq') return testNotEquals
  if(comparison === '$ck') return testEquals
  if(comparison === '$nck') return testNotEquals
  if(comparison === '$kn') return testKnown
  if(comparison === '$nkn') return testNotKnown
  if(comparison === '$lk') return testLike
  if(comparison === '$nlk') return testNotLike
  if(comparison === '$in') return testIn
  if(comparison === '$nin') return testNotIn
  if(comparison === '$an') return testAn
  if(comparison === '$nan') return testNotAn
  if(comparison === '$ct') return testContains
  if(comparison === '$nct') return testNotContains
  if(comparison === '$lt') return testLessThan
  if(comparison === '$lte') return testLessThanEqual
  if(comparison === '$gt') return testGreaterThan
  if(comparison === '$gte') return testGreaterThanEqual
  if(comparison === '$se') return testSent
  if(comparison === '$nse') return testNotSent
  if(comparison === '$de') return testDelivered
  if(comparison === '$nde') return testNotDelivered
  if(comparison === '$op') return testOpened
  if(comparison === '$nop') return testNotOpened
  if(comparison === '$ck') return testClicked
  if(comparison === '$nck') return testNotClicked
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
  const left = _.get(data, key) || null
  const comparison = Object.keys(filter[key])[0]
  const right = Object.values(filter[key])[0]
  const evaluator = getEvaluator(comparison)
  return evaluator(left, right)
}

const evaluate = async (filter, data) => {
  if(filter.$and) return await evaluateAnd(filter, data)
  if(filter.$or) return await evaluateOr(filter, data)
  return await evaluateCondition(filter, data)
}

export default evaluate
