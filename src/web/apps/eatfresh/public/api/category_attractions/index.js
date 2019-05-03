import { Resources } from '../../../../../core/backframe'
import Attraction from '../../../models/attraction'
import AttractionSerializer from '../../../serializers/attraction_serializer'

const defaultQuery = (req, trx, qb, options) => {

  qb.select(options.knex.raw('distinct on (eatfresh_attractions.id,eatfresh_attractions.title) eatfresh_attractions.*'))

  qb.innerJoin('eatfresh_categories_attractions', 'eatfresh_categories_attractions.attraction_id', 'eatfresh_attractions.id')

  qb.where('eatfresh_categories_attractions.category_id', req.params.category_id)

}

const offeringFilter = (qb, filter, options) => {

  const join = filter['$in'].map((item, index) => `inner join "eatfresh_offerings_attractions" "offerings${index}" on "offerings${index}"."attraction_id" = "eatfresh_attractions"."id" and "offerings${index}"."offering_id" = ?`).join(' ')

  qb.joinRaw(join, filter['$in'])

}

const attractionResources = new Resources({
  defaultQuery,
  defaultSort: 'title',
  filterParams: ['is_grassfed','is_organic','is_vegetarian','is_vegan','county_id'],
  model: Attraction,
  only: ['list'],
  path: '/categories/:category_id/attractions',
  serializer: AttractionSerializer,
  searchParams: ['title'],
  virtualFilters: {
    offering_id: offeringFilter
  },
  withRelated: ['county','photo']
})

export default attractionResources
