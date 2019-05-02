import AttractionSerializer from '../../../serializers/attraction_serializer'
import Attraction from '../../../models/attraction'
import { Resources, updateRelated } from 'maha'
import { slugify } from './slugify'
import approve from './approve'
import reject from './reject'

const activity = story => (req, trx, object, options) => ({
  story,
  object
})

const activities = {
  create: activity('created {object}'),
  update: activity('updated {object}'),
  destroy: activity('deleted {object}')
}

const defaultParams = (req, trx, option) => ({
  slug: slugify(req.body.title),
  is_approved: true
})

const defaultQuery = (req, trx, qb, options) => {

  qb.leftJoin('eatfresh_counties', 'eatfresh_counties.id', 'eatfresh_attractions.county_id')

}

const offeringFilter = (qb, filter, options) => {

  const join = filter.$in.map((item, index) => `inner join "eatfresh_offerings_attractions" "offerings${index}" on "offerings${index}"."attraction_id" = "eatfresh_attractions"."id" and "offerings${index}"."offering_id" = ?`).join(' ')

  qb.joinRaw(join, filter.$in)

}

const categoryFilter = (qb, filter, options) => {

  qb.innerJoin('eatfresh_categories_attractions', 'eatfresh_categories_attractions.attraction_id', 'eatfresh_attractions.id')

  qb.where('eatfresh_categories_attractions.category_id', filter.$eq)

}

const channels = (req, trx, result, options) => [
  '/admin/eatfresh/attractions',
  `/admin/eatfresh/attractions/${result.get('id')}`
]

const refresh = {
  create: channels,
  update: channels,
  destroy: channels
}

const attractionResources = new Resources({
  activities,
  afterProcessor: {
    create: [
      updateRelated('categories', 'eatfresh_categories_attractions', 'category_ids', 'attraction_id', 'category_id'),
      updateRelated('offerings', 'eatfresh_offerings_attractions', 'offering_ids', 'attraction_id', 'offering_id')
    ],
    update: [
      updateRelated('categories', 'eatfresh_categories_attractions', 'category_ids', 'attraction_id', 'category_id'),
      updateRelated('offerings', 'eatfresh_offerings_attractions', 'offering_ids', 'attraction_id', 'offering_id')
    ]
  },
  allowedParams: ['title','photo_id','description','address_1','address_2','city','state','zip','county_id','phone','hours_of_operation','website','facebook','is_free_range','is_accessible','is_family_friendly','is_senior','is_military','is_family_owned','is_organic','is_vegetarian'],
  defaultParams,
  defaultQuery,
  filterParams: ['is_approved','is_free_range','is_accessible','is_family_friendly','is_senior','is_military','is_family_owned','is_organic','is_vegetarian','county_id'],
  memberActions: [
    approve,
    reject
  ],
  model: Attraction,
  path: '/attractions',
  refresh,
  searchParams: ['title'],
  serializer: AttractionSerializer,
  sortParams: ['id','title','eatfresh_counties.name'],
  virtualFilters: {
    category_id: categoryFilter,
    offering_id: offeringFilter
  },
  virtualParams: ['category_ids','offering_ids','photo_ids'],
  withRelated: ['county','photo','photos.asset','offerings.photo','categories.photo']
})

export default attractionResources
