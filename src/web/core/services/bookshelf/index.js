import './validations/later_than_validation'
import './validations/datestring_validation'
import './validations/currency_validation'
import './validations/greater_than_field_validation'
import './validations/time_validation'
import './validations/unique_validation'
import pagination from './fetch_page'
import Bookshelf from 'bookshelf'
import filter from './filter'
import knex from '../knex'
import sort from './sort'

const bookshelf = Bookshelf(knex)

bookshelf.plugin('virtuals')

bookshelf.plugin(filter)

bookshelf.plugin(sort)

bookshelf.plugin(pagination)

export default bookshelf
