import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const Search = new Model(knex, {

  databaseName: 'maha',

  tableName: 'maha_searches'

})

export default Search
