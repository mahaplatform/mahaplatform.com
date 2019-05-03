import Checkit from 'checkit'

Checkit.Validator.prototype.currency = function(val) {

  const column = Object.keys(this._target).reduce((column, key) => {
    return column || (this._target[key] === val ? key : null)
  }, null)

  if(!val.match(/^\d{1,}\.\d{2}$/)) {
    throw new Error(`The ${column} must be valid currency`)
  }

  return true

}
