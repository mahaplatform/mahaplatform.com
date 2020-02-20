import './validations/later_than_validation'
import './validations/datestring_validation'
import './validations/currency_validation'
import './validations/greater_than_field_validation'
import './validations/time_validation'
import './validations/unique_validation'
import fetchOrCreate from './fetch_or_create'
import knex from '../../services/knex'
import Bookshelf from 'bookshelf'
import filterFetch from './filter_fetch'

const bookshelf = Bookshelf(knex)

bookshelf.plugin('virtuals')

bookshelf.plugin(filterFetch)

// bookshelf.plugin(scope)

// bookshelf.plugin(sort)

// bookshelf.plugin(fetchPage)

bookshelf.plugin(fetchOrCreate)

export default bookshelf
