import AttractionSerializer from '../../../serializers/attraction_serializer'
import Attraction from '../../../models/attraction'
import { slugify } from '../../../admin/api/attractions/slugify'
import { mailer, Resources, Team, User } from 'maha'

const defaultParams = (req, trx, option) => ({
  team_id: 7,
  slug: slugify(req.body.title)
})

const defaultQuery = (req, trx, qb, options) => {

  qb.select(options.knex.raw('distinct on (eatfresh_attractions.id,eatfresh_attractions.title) eatfresh_attractions.*'))

  qb.where({ is_approved: true })

}

const offeringFilter = (qb, filter, options) => {

  const join = filter.$in.map((item, index) => `inner join "eatfresh_offerings_attractions" "offerings${index}" on "offerings${index}"."attraction_id" = "eatfresh_attractions"."id" and "offerings${index}"."offering_id" = ?`).join(' ')

  qb.joinRaw(join, filter.$in)

}

const categoryFilter = (qb, filter, options) => {

  qb.innerJoin('eatfresh_categories_attractions', 'eatfresh_categories_attractions.attraction_id', 'eatfresh_attractions.id')

  qb.where('eatfresh_categories_attractions.category_id', filter.$eq)

}

const notification = async (req, trx, object, options) => {

  req.team = await Team.where({ id: 7 }).fetch({ transacting: trx })

  const recipients = await User.query(qb => {

    qb.select(options.knex.raw('distinct on (maha_users.id, maha_users.first_name, maha_users.last_name, maha_users.email) maha_users.*'))

    qb.innerJoin('maha_users_roles', 'maha_users_roles.user_id', 'maha_users.id')

    qb.innerJoin('maha_roles_apps', 'maha_roles_apps.role_id', 'maha_users_roles.role_id')

    qb.where('maha_users.team_id', 7)

    qb.where('maha_roles_apps.app_id', 4)

  }).fetchAll({ transacting: trx })

  return {
    type: 'eatfresh:attraction_suggested',
    recipient_ids: recipients.map(user => user.get('id')),
    story: 'A visitor suggested {object}',
    object
  }

}

const rules = {
  contact_name: 'required',
  contact_email: 'required',
  contact_phone: 'required',
  title: 'required',
  address_1: 'required',
  city: 'required',
  state: 'required',
  zip: 'required',
  county_id: 'required',
  phone: 'required',
  hours_of_operation: 'required'
}

const sendEmail = async (req, trx, result, options) => {

  await mailer.enqueue(req, trx, {
    team_id: 7,
    to: req.body.contact_email,
    template: 'eatfresh:thankyou',
    data: req.body
  })

}

const attractionResources = new Resources({
  afterProcessor: {
    create: sendEmail
  },
  allowedParams: ['contact_name','contact_email','contact_phone','title','photo_id','description','address_1','address_2','city','state','zip','county_id','phone','hours_of_operation','website','facebook','is_free_range','is_accessible','is_family_friendly','is_senior','is_military','is_family_owned','is_organic','is_vegetarian'],
  defaultParams,
  defaultQuery,
  defaultSort: 'title',
  filterParams: ['is_free_range','is_accessible','is_family_friendly','is_senior','is_military','is_family_owned','is_organic','is_vegetarian','county_id'],
  model: Attraction,
  notification: {
    create: notification
  },
  only: ['list','show','create'],
  path: '/attractions',
  primaryKey: 'slug',
  rules: {
    create: rules
  },
  serializer: AttractionSerializer,
  searchParams: ['title'],
  virtualFilters: {
    category_id: categoryFilter,
    offering_id: offeringFilter
  },
  virtualParams: ['category_ids','offering_ids'],
  withRelated: ['county','photo','offerings.photo','photos.asset']
})

export default attractionResources
