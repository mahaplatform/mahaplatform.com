import { Audit, Story, Route, Import, ImportItem, ImportSerializer, socket } from 'maha'
import Trip from '../../../models/trip'
import moment from 'moment'

const processor = async (req, trx, options) => {

  const imp = await Import.where({
    id: req.body.id
  }).fetch({
    transacting: trx
  })

  const items = await ImportItem.where({
    import_id: req.body.id
  }).fetchAll({
    transacting: trx
  })

  const rateRecords = await options.knex('expenses_rates')

  const rates = rateRecords.reduce((rates, record) => ({
    ...rates,
    [record.year]: record.value
  }), {})

  const config = await options.knex('maha_installations')
    .select(options.knex.raw('settings->\'trip_expense_type_id\' as expense_type'))
    .transacting(trx)
    .innerJoin('maha_apps', 'maha_apps.id', 'maha_installations.app_id' )
    .where({
      team_id: imp.get('team_id'),
      code: 'expenses'
    })

  await ImportItem.where({
    import_id: req.body.id
  }).fetchAll({
    transacting: trx
  })

  await Promise.mapSeries(items.toArray(), async (item, index) => {

    const trip = await Trip.where({
      id: item.get('object_id')
    }).fetch({
      transacting: trx
    })

    const mileage_rate = rates[moment(trip.get('date')).format('YYYY')]

    await trip.save({
      expense_type_id: config[0].expense_type,
      mileage_rate,
      amount: mileage_rate * trip.get('total_miles')
    }, {
      patch: true,
      transacting: trx,
      skipValidation: true
    })

    const story_id = await _findOrCreateStoryId('imported', trx)

    await Audit.forge({
      team_id: trip.get('team_id'),
      user_id: trip.get('user_id'),
      auditable_type: 'expenses_trips',
      auditable_id: trip.get('id'),
      story_id
    }).save(null, { transacting: trx })

    await socket.in(`/admin/imports/${imp.get('id')}`).emit('message', {
      target: `/admin/imports/${imp.get('id')}`,
      action: 'progress',
      data: {
        completed: index + 1,
        total: items.length
      }
    })

  })

  await socket.in(`/admin/imports/${imp.get('id')}`).emit('message', {
    target: `/admin/imports/${imp.get('id')}`,
    action: 'success',
    data: ImportSerializer(null, null, imp)
  })

  await socket.in(`/admin/users/${imp.get('user_id')}`).emit('message', {
    target: '/admin/expenses/items',
    action: 'refresh'
  })

  return {}
}


const _findOrCreateStoryId = async (text, trx) => {

  if(!text) return null

  const findStory = await Story.where({ text }).fetch({ transacting: trx })

  const story = findStory || await Story.forge({ text }).save(null, { transacting: trx })

  return story.id

}


const finalizeRoute = new Route({
  method: 'patch',
  path: '/import/finalize',
  processor
})

export default finalizeRoute
