import ImportSerializer from '@apps/maha/serializers/import_serializer'
import ImportItem from '@apps/maha/models/import_item'
import generateCode from '@core/utils/generate_code'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
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

    const code = await generateCode(req, {
      table: 'finance_trips'
    })

    const mileage_rate = rates[moment(trip.get('date')).format('YYYY')]

    await trip.save({
      code,
      odometer_start: trip.get('odometer_start') ? trip.get('odometer_start') : 0,
      odometer_end: trip.get('odometer_end') ? trip.get('odometer_end') : 0,
      expense_type_id: 16,
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
