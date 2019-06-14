import AttractionSerializer from '../../../serializers/attraction_serializer'
import knex from '../../../../../core/services/knex'
import Attraction from '../../../models/attraction'

const listRoute = async (req, res) => {

  const attractions = await Attraction.scope({
    team: req.team
  }).query(qb => {
    qb.select(knex.raw('distinct on (eatfresh_attractions.id,eatfresh_attractions.title) eatfresh_attractions.*'))
    qb.leftJoin('eatfresh_counties', 'eatfresh_counties.id', 'eatfresh_attractions.county_id')
    qb.leftJoin('eatfresh_categories_attractions', 'eatfresh_categories_attractions.attraction_id', 'eatfresh_attractions.id')
    qb.leftJoin('eatfresh_offerings_attractions', 'eatfresh_offerings_attractions.attraction_id', 'eatfresh_attractions.id')
    qb.where('is_approved', true)
  }).filter({
    filter: req.query.$filter,
    filterParams: ['is_approved','is_free_range','is_accessible','is_family_friendly','is_senior','is_military','is_family_owned','is_organic','is_vegetarian','county_id'],
    searchParams: ['title'],
    virtualFilters: {
      category_id: (qb, filter) => {
        if(!filter.$eq) return
        qb.where('eatfresh_categories_attractions.category_id', filter.$eq)
      },
      offering_id: (qb, filter) => {
        if(!filter.$in) return
        qb.where('eatfresh_offerings_attractions.offering_id', filter.$eq)
      }
    }
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'title',
    sortParams: ['id','title','eatfresh_counties.name']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['county','photo','photos.asset','offerings.photo','categories.photo'],
    transacting: req.trx
  })

  res.status(200).respond(attractions, (attraction) => {
    return AttractionSerializer(req, req.trx, attraction)
  })

}

export default listRoute
