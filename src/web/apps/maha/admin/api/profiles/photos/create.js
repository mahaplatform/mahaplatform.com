import AssetSerializer from '../../../../serializers/asset_serializer'
import Profile from '../../../../models/profile'
import instagram from './instagram/create'
import facebook from './facebook/create'
import google from './google/create'

const create = async (req, profile) => {
  const network = profile.related('source').get('text')
  if(network === 'facebook') return facebook(req, profile)
  if(network === 'google') return await google(req, profile)
  if(network === 'instagram') return await instagram(req, profile)
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

  const asset = await create(req, profile)

  await asset.load(['source'], {
    transacting: req.trx
  })

  res.status(200).respond(asset, AssetSerializer)

}

export default filesRoute
