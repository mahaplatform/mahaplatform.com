import Checkit from 'checkit'

Checkit.Validator.prototype.time = function(val) {

  const column = Object.keys(this._target).reduce((column, key) => {
    return column || (this._target[key] === val ? key : null)
  }, null)

  if(val.match(/^(\d{1,2}):(\d{2}):?(\d{2})?\s?([am|pm]*)?$/i) === null) {
    throw new Error(`The ${column} must be valid time`)
  }

  return true

}
