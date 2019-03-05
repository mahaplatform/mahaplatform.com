import TripSerializer from '../../../serializers/trip_serializer'
import Trip from '../../../models/trip'
import Rate from '../../../models/rate'
import itemResources from './item'
import moment from 'moment'

const alterRequest = async (req, trx, options) => {

  req.body.expense_type_id = req.apps.expenses.settings.trip_expense_type_id
  
  if(!req.body.date) return req

  const year = parseInt(moment(req.body.date).format('YYYY'))
  
  const rate = await Rate.where({ year }).fetch({ transacting: trx })
  
  if(!rate) return req

  req.body.mileage_rate = rate.get('value')

  if(!req.body.total_miles) return req

  req.body.amount = req.body.total_miles * req.body.mileage_rate

  return req

}

const defaultQuery = (req, trx, qb, options) => {

  qb.leftJoin('expenses_projects', 'expenses_projects.id', 'expenses_trips.project_id')

  qb.leftJoin('expenses_statuses', 'expenses_statuses.id', 'expenses_trips.status_id')

}

const tripResources = itemResources({
  allowedParams: ['expense_type_id','project_id','date','description','time_leaving','time_arriving','odometer_start','odometer_end','total_miles','amount','mileage_rate'],
  alterRequest: {
    create: alterRequest,
    update: alterRequest
  },
  defaultQuery,
  defaultSort: '-created_at',
  filterParams: ['project_id','date','status_id'],
  model: Trip,
  name: 'trip',
  required: ['date','description','project_id','odometer_start','odometer_end','total_miles'],
  serializer: TripSerializer,
  searchParams: ['description','expenses_projects.title','description'],
  sortParams: ['id','date','expenses_projects.title','total_miles','description','amount','expenses_statuses.text','created_at'],
  withRelated: ['user','project.members','expense_type','status']
})

export default tripResources
