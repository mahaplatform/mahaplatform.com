import Setting from '@apps/platform/models/setting'

const showRoute = async (req, res) => {

  const settings = await Setting.query(qb => {
    qb.where('id', 1)
  }).fetch({
    transacting: req.trx
  })

  if(!settings) return res.status(404).respond({
    code: 404,
    message: 'Unable to load settings'
  })

  await res.status(200).respond(settings.get('values'))

}

export default showRoute
