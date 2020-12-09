import './validations/later_than_validation'
import './validations/datestring_validation'
import './validations/currency_validation'
import './validations/greater_than_field_validation'
import fetchOrCreate from './fetch_or_create'
import './validations/unique_validation'
import filterFetch from './filter_fetch'
import './validations/time_validation'
import knex from '../../vendor/knex'
import Bookshelf from 'bookshelf'

const bookshelf = Bookshelf(knex)

bookshelf.plugin('virtuals')

bookshelf.plugin(filterFetch)

bookshelf.plugin(fetchOrCreate)

export default bookshelf
