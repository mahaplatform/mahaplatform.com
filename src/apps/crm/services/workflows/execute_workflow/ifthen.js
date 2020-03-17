import _ from 'lodash'

const evaluate = async (left, comparison, right) => {
  if(right === 'else') return true
  if(comparison === '$eq') {
    return left === right
  }
}

const ifthen = async (req, { config, enrollment, step, tokens }) => {

  const { comparison, options, token } = config

  await enrollment.load(['response'], {
    transacting: req.trx
  })

  const response = enrollment.related('response')

  const data = {
    ...tokens,
    response: response.get('data')
  }

  const value = _.get(data, token)

  const option = options.find(option => {
    return evaluate(value, comparison, option.value)
  })

  return {
    data: {
      option: option.code
    },
    condition: {
      parent: step.get('code'),
      answer: option.code,
      delta: -1
    }
  }

}

export default ifthen
