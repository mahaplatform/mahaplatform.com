import Checkit from 'checkit'

Checkit.Validator.prototype.greaterThanField = function(val, param) {

  if(val <= this._target[param]) throw new Error(`must be greater than the ${param}`)

  return true

}
