import _ from 'lodash'

export const whitelist = (params, allowedParams) => {
  const allowed = _.pick(params, allowedParams)
  return _.omitBy(allowed, _.isUndefined)
}
