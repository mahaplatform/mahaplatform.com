import Profile from '../../../../models/profile'
import googlephotos from './googlephotos/list'
import instagram from './instagram/list'
import facebook from './facebook/list'

const getList = (service) => {
  if(service === 'facebook') return facebook
  if(service === 'googlephotos') return googlephotos
  if(service === 'instagram') return instagram
}

const filesRoute = async (req, res) => {

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

export default filesRoute
