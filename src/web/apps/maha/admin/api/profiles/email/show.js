import Profile from '../../../../models/profile'
import outlook from './outlook/show'
import gmail from './gmail/show'

const getShow = (service) => {
  if(service === 'outlook') return outlook
  if(service === 'gmail') return gmail
}

const showRoute = async (req, res) => {

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

  const show = getShow(profile.related('source').get('text'))

  const records = await show(req, profile)

  res.status(200).respond(records)

}

export default showRoute
