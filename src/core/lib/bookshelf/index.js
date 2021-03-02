import './validations/later_than_validation'
import './validations/datestring_validation'
import './validations/currency_validation'
import './validations/greater_than_field_validation'
import fetchOrCreate from './fetch_or_create'
import './validations/unique_validation'
import filterFetch from './filter_fetch'
import './validations/time_validation'
import * as knex from '@core/vendor/knex'
import Bookshelf from 'bookshelf'

const creator = (knex) => {

  const bookshelf = Bookshelf(knex)

  bookshelf.plugin('virtuals')

  bookshelf.plugin(filterFetch)

  bookshelf.plugin(fetchOrCreate)

  return bookshelf

}

export const maha = creator(knex.maha)

export const analytics = creator(knex.analytics)

export default maha
