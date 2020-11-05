import ImportSerializer from '@apps/maha/serializers/import_serializer'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import ImportItem from '@apps/maha/models/import_item'
import Import from '@apps/maha/models/import'
import Trip from '@apps/finance/models/trip'
import moment from 'moment'

const finalizeRoute = async (req, res) => {

  const imp = await Import.where({
    id: req.body.id
  }).fetch({
    transacting: req.trx
  })

  const items = await ImportItem.where({
    import_id: req.body.id
  }).fetchAll({
    transacting: req.trx
  }).then(items => items.toArray())

  const rates = await req.trx('finance_rates').then(rates => {
    return rates.reduce((rates, record) => ({
      ...rates,
      [record.year]: record.value
    }), {})
  })

  const config = await req.trx('maha_installations')
    .select(req.trx.raw('settings->\'trip_expense_type_id\' as expense_type'))
    .innerJoin('maha_apps', 'maha_apps.id', 'maha_installations.app_id' )
    .where({
      team_id: imp.get('team_id'),
      code: 'expenses'
    })

  await ImportItem.where({
    import_id: req.body.id
  }).fetchAll({
    transacting: req.trx
  })

  await Promise.mapSeries(items, async (item, index) => {

    const trip = await Trip.where({
      id: item.get('object_id')
    }).fetch({
      transacting: req.trx
    })

    const mileage_rate = rates[moment(trip.get('date')).format('YYYY')]

    await trip.save({
      expense_type_id: config[0].expense_type,
      mileage_rate,
      amount: mileage_rate * trip.get('total_miles')
    }, {
      patch: true,
      transacting: req.trx,
      skipValidation: true
    })

    await audit(req, {
      user_id: trip.get('user_id'),
      auditable: trip
    })

    await socket.message(req, {
      channel: `/admin/imports/${imp.get('id')}`,
      action: 'progress',
      data: {
        completed: index + 1,
        total: items.length
      }
    })

  })

  await socket.refresh(req, {
    channel: `/admin/users/${imp.get('user_id')}`,
    target: '/admin/finance/items'
  })

  await socket.message(req, {
    channel: `/admin/imports/${imp.get('id')}`,
    action: 'success',
    data: ImportSerializer(null, imp)
  })

  res.status(200).respond(true)

}

export default finalizeRoute
