import Profile from '../../../../models/profile'
import instagram from './instagram/list'
import facebook from './facebook/list'
import google from './google/list'

const getListCreator = (network) => {
  if(network === 'facebook') return facebook
  if(network === 'googlephotos') return google
  if(network === 'instagram') return instagram
}

const filesRoute = async (req, res) => {

  const profile = await Profile.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id )
  }).fetch({
    withRelated: ['source'],
    transacting: req.trx
  })

  if(!profile) return res.status(404).json({
    code: 404,
    message: 'Unable to find profile'
  })

  const listCreator = getListCreator(profile.related('source').get('text'))

  const records = await listCreator(req, profile)

  res.status(200).respond(records)

}

export default filesRoute
