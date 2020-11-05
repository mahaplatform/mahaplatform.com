import Profile from '@apps/maha/models/profile'

const checkRoute = async (req, res) => {

  const profile = await Profile.query(qb => {
    qb.innerJoin('maha_sources', 'maha_sources.id', 'maha_profiles.source_id')
  }).where({
    text: req.params.source,
    user_id: req.user.get('id')
  }).fetch({
    transacting: req.trx
  })

  const data = profile !== null

  res.status(200).respond(data)

}

export default checkRoute
