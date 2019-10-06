import Profile from '../../../../models/profile'
import instagram from './instagram/list'
import facebook from './facebook/list'
import twitter from './twitter/list'

const getList = (service) => {
  if(service === 'instagram') return instagram
  if(service === 'facebook') return facebook
  if(service === 'twitter') return twitter
}

const listRoute = async (req, res) => {

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

  const list = getList(profile.related('source').get('text'))

  const records = await list(req, profile)

  res.status(200).respond(records)

}

export default listRoute
