import Checkit from 'checkit'
import _ from 'lodash'

Checkit.Validator.prototype.datestring = function(val) {

  const column = Object.keys(this._target).reduce((column, key) => {
    return column || (this._target[key] === val ? key : null)
  }, null)

  if(_.isString(val) && !val.match(/^\d{4}-\d{2}-\d{2}$/)) {
    throw new Error(`The ${column} must be in the format YYYY-MM-DD`)
  }

  return true

}
