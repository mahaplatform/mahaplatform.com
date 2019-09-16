import AssetSerializer from '../../../../serializers/asset_serializer'
import Profile from '../../../../models/profile'
import googlephotos from './googlephotos/create'
import instagram from './instagram/create'
import facebook from './facebook/create'

const getCreate = async (service) => {
  if(service === 'googlephotos') return googlephotos
  if(service === 'instagram') return instagram
  if(service === 'facebook') return facebook
}

const filesRoute = async (req, res) => {

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

  const create = getCreate(profile.related('source').get('text'))

  const asset = await create(req, profile)

  await asset.load(['source'], {
    transacting: req.trx
  })

  res.status(200).respond(asset, AssetSerializer)

}

export default filesRoute
