import fetchOrCreate from '@core/lib/bookshelf/fetch_or_create'
import filterFetch from '@core/lib/bookshelf/filter_fetch'
import knex from '@core/analytics/knex'
import Bookshelf from 'bookshelf'

const bookshelf = Bookshelf(knex)

bookshelf.plugin('virtuals')

bookshelf.plugin(filterFetch)

bookshelf.plugin(fetchOrCreate)

export default bookshelf
