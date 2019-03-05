import knex from '../services/knex'
import Checkit from 'checkit'
import _ from 'lodash'

Checkit.Validator.prototype.unique = function(val, params = {}, options = {}) {

  const tableName = params.tableName || options.tableName

  const column = Object.keys(this._target).reduce((column, key) => {
    return column || (this._target[key] === val ? key : null)
  }, null)

  let query = knex(tableName).where(column, '=', val)

  if(_.isString(params)) {
    params.split(',').map(key => {
      query = query.where(key, this._target[key])
    })
  }

  if(this._target.team_id) {
    query = query.where({ team_id: this._target.team_id})
  }

  if(this._target.id) {
    query = query.whereNot({ id: this._target.id })
  }

  return query.then(resp => {
    if(resp.length > 0) throw new Error(`The ${column} is already in use`)
  })

}
Checkit.Validator.prototype.unique.message = 'Foo'
