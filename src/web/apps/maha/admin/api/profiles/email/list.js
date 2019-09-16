import Profile from '../../../../models/profile'
import outlook from './outlook/list'
import gmail from './gmail/list'

const getList = (service, type) => {
  if(service === 'outlook') return outlook(type)
  if(service === 'gmail') return gmail(type)
}

const listRoute = (type) => async (req, res) => {

  const profile = await Profile.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.profile_id )
  }).fetch({
    withRelated: ['source'],
    transacting: req.trx
  })

  if(!profile) return res.status(404).json({
    code: 404,
    message: 'Unable to find profile'
  })

  const list = getList(profile.related('source').get('text'), type)

  const records = await list(req, profile)

  res.status(200).respond(records)

}

export default listRoute
