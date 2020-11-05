import socket from '@core/services/routes/emitter'
import Setting from '../../../models/setting'

const updateRoute = async (req, res) => {

  const settings = await Setting.where({
    id: 1
  }).fetch({
    transacting: req.trx
  })

  if(!settings) return res.status(404).respond({
    code: 404,
    message: 'Unable to load settings'
  })

  await settings.save({
    values: req.body
  }, {
    patch: true,
    transacting: req.trx
  })

  await socket.refresh(req, [
    '/admin/platform/settings'
  ])

  res.status(200).respond(settings.get('values'))

}

export default updateRoute
