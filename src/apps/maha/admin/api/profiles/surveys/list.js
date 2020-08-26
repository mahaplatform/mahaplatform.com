import Profile from '../../../../models/profile'
import qualtrics from './qualtrics/list'

const getList = (service) => {
  if(service === 'qualtrics') return qualtrics
}

const surveysRoute = async (req, res) => {

  const profile = await Profile.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.profile_id )
  }).fetch({
    withRelated: ['source'],
    transacting: req.trx
  })

  if(!profile) return res.status(404).json({
    code: 404,
    message: 'Unable to find profile'
  })

  const list = getList(profile.related('source').get('text'))

  const records = await list(req, profile)

  res.status(200).respond(records)

}

export default surveysRoute
